## axios 일반적인 사용

React를 사용 하다보면 컴포넌트 안 에서 데이터를 패칭해서 가져와야 할 때가 있습니다. 그 경우 컴포넌트안에 마다 axios를 호출하고 baseUrl를 매번 입력한다면 같은 코드가 반복되고 생산성이 떨어지게 됩니다. 아래 코드를 봅시다.

```tsx
function Example() {
  let [data, setData] = useState([]);

  function searchApi() {
    const url = "https://jsonplaceholder.typicode.com/photos";
    axios
      .get(url)
      .then(function (response) {
        setPhotos(response.data);
        console.log("성공");
      })
      .catch(function (error) {
        console.log("실패");
      });
  }

  useEffect(() => {
    searchApi();
  }, []);
}
export default Example;
```

매번 axios config 설정을 해야되는 상황이 생기게 되고 이는 코드 중복을 일으키게 됩니다. 이를 방지하기 위해서 `공통되는 config를 설정한 axios 인스턴스를 제공해주는 클래스`를 하나 만들어 제공합니다.

```tsx
import axios from "axios";

class AxiosInstance {
  private static DEFAULT_URL = "https://httpbin.org";
  private static TIME_OUT = 3000;

  static createInstance(baseUrl?: string) {
    return axios.create({
      baseURL: baseUrl ? baseUrl : AxiosInstance.DEFAULT_URL,
      timeout: AxiosInstance.TIME_OUT,
    });
  }
}

export default AxiosInstance;
```

아주 간단하게 baseUrl과 timeout 설정을 한 axios 인스턴스를 만드는 클래스입니다. 이는 axios를 사용하는 다른 곳에서 `사용 할 때 가져오기만 하면 됩니다.` 예를 들어 음악 검색 목록을 가져오는 api 클래스가 있다고 하겠습니다. 아래는 단순한 예제입니다.

- 엔드포인트 별로 클래스를 만듭니다.
- recoil async selector와 함께 쓰입니다.
- 에러 처리와 패딩 처리는 외부로 위임 합니다. ([AyncBoundary](https://varletc0nst.tistory.com/39) 사용)

```tsx
class MusicService {
  static search(keyword: string) {
    return AxiosInstance.createInstance().get<MusicReleaseEntity>(
      `/?song=${keyword}`
    );
  }
}
```

일단 MusicService를 구현해보겠습니다. 이 클래스는 음악 관련 api를 모아놓은 클래스입니다. 메소드를 만들 때에 `AxiosInstance.createInstance()`으로 인스턴스를 가져온 뒤에 사용 할 http 메소드를 호출하면 됩니다. 이 메소드는 `recoil async selector`에서 데이터를 받아오게 됩니다.

```tsx
export interface MusicEntity {
  name: string;
  artist: string;
  album: string;
  albumimg: string;
  date: string;
  melonlink: string;
  kakaomelonlink: string;
  lyrics: string;
}

export interface MusicReleaseEntity {
  type: string;
  status: string;
  lineup: string[];
  song: MusicEntity[];
}

export class Music {
  name: string;
  artist: string;
  album: string;
  albumimg: string;
  date: string;
  melonlink: string;
  kakaomelonlink: string;
  lyrics: string;
  constructor(entity: MusicEntity) {
   ... 생략
  }

  public checkNewRelease(date: string) {
    ... 최신곡인지 체크하는 로직
  }
}

export class MusicList {
  list: Music[];
  constructor(list: Music[]) {
    this.list = list;
  }
}

const musicSelector = selectorFamily<MusicList, string>({
  key: "musicState",
  get:
    (keyword) =>
    async ({ get }) => {
      const response = await MusicService.search(keyword);
      const list = response.data.song.reduce<Music[]>(
        (acc, song) => (acc = [...acc, new Music(song)]),
        []
      );
      return new MusicList(list);
    },
});

export function useSearchMusicList(keyword: string) {
  return useRecoilValue(musicSelector(keyword));
}
```

`musicSelector`의 비동기 셀럭터를 이용하여 데이터를 받아오고 그에 맞는 클래스로 객체를 생성하여 `데이터만 리턴`합니다. 중간에 `Music` 객체로 맵을 돌려 `MusicList`라는 객체를 리턴하게 되면 이 비동기 셀렉터를 이용하여 더욱 쉽게 데이터를 관리 할 수 있게 됩니다. 예를 들어 아래 코드를 보면,

```tsx
function MusicList({ keyword }: MusicListProps) {
  const musicList = useSearchMusicList(keyword);

  return (
    <ul>
      {musicList.list.map((song, i) => (
        <li key={`song-${i}`}>
          {song.name} - {song.artist} {song.checkNewRelease(date) ? "-new" : ""}
        </li>
      ))}
    </ul>
  );
}

export default MusicList;
```

`useSearchMusicList` 비동기 셀렉터를 사용하는 컴포넌트를 보았을 때 musicList를 쉽게 가지고 와서 음악 리스트를 랜더링 해줄 수 있습니다. 또한 Music 클래스안에는 `checkNewRelease` 라는 메소드가 정의되어 있어 쉽게 신곡인지 아닌지 판단하는 처리를 할 수 있습니다. 즉.

이전 → music 데이터에 date 값을 현재와 비교해서 신곡인지 아닌지 `판단하는 함수를 컴포넌트 내부에 정의`해야 함.

개선 → Music이라는 `객체에 내부 메소드`로 `checkNewRelease`를 구현하여 쉽게 처리가 가능함 (`캡슐화`!)

캡슐화: [https://varletc0nst.tistory.com/19?category=924743](https://varletc0nst.tistory.com/19?category=924743)

## 정리

Axios를 따로 클래스로 분리하고 비동기 처리 이후 받는 데이터도 클래스 객체로 받게하므로써 컴포넌트 내부에서 좀 더 편리하고 쉽게 데이터 처리가 가능합니다.
