## 에러처리 방법

[AsyncBoundary](https://varletc0nst.tistory.com/39)를 이용해서 컴포넌트에서 일어나는 에러처리를 외부로 위임 했었습니다. Errorboundary는 Props로 Error 객체를 받을 수 있기 때문에 status code, flag, desc등 서버에서 주는 플래그에 따라 원하는 컴포넌트를 랜더링 할 수 있습니다. 이 포스팅에서는 `AsyncBoundary를 이용하여 데이터 패칭을 하다 오류 발생 시 플래그에 따라 어떻게 처리 할 것인지`에 대한 내용입니다.

다음 내용들은 [AsyncBoundary](https://varletc0nst.tistory.com/39)의 구현체를 알고 동작 방식을 알아야 이해가 가능하므로 읽어주시면 감사하겠습니다.

## 맨 처음 데이터를 불러오다가 발생하는 에러

```tsx
interface ErrorBody {
  code: number;
  message: string;
  description: string;
}

function isAxiosError(res: unknown): res is AxiosError<ErrorBody> {
  if (typeof res !== "object" || res == null) {
    return false;
  }

  return true;
}

function FetchErrorPage() {
  return (
    <AsyncBoundary
      ErrorFallback={(props) => <DisplayError {...props} />}
      SuspenseFallback={<div>...loading</div>}
    >
      <ErrorHandle />
    </AsyncBoundary>
  );
}

export default FetchErrorPage;
```

먼저 `AsnycBoundary`를 사용한 모습입니다. `ErrorHandle`컴포넌트 안에서 `비동기 셀럭터`를 이용하여 데이터 패칭이 일어나고 에러가 발생한 경우 바로 AsyncBoundary가 그 처리를 위임 받습니다. 즉 `DisplayError` 컴포넌트 안으로 에러 객체가 전달되게 됩니다. 데이터 패칭 후 다음과 같은 에러가 발생 했다고 하겠습니다.

![스크린샷 2021-11-02 오후 9.13.35.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/022efde5-1703-4493-b764-255fa5eb605f/스크린샷_2021-11-02_오후_9.13.35.png)

status code는 404, response body는 다음과 같이 리턴을 받았습니다. 이 처리를 `DisplayError` 컴포넌트 안에서 처리하는 방법입니다.

```tsx
function DisplayError({ error, resetErrorBoundary }: DisplayErrorProps) {
  const [desc, setDesc] = useState("");

  useEffect(() => {
    // custom error handling
    if (isAxiosError(error) && error.response) {
      setDesc(error.response.data.description);
    }
  }, []);

  return (
    <div role="alert">
      <p>에러가 발생 했습니다!</p>
      <pre>{desc}</pre>
      <button onClick={() => resetErrorBoundary()}>다시 시도</button>
    </div>
  );
}
```

`DisplayError` 구현체입니다. Props로 error 객체를 이어 받고 있습니다. 이 Error 객체는 `isAxiosError`함수를 이용해서 AxiosError 인지를 판단하고 참일 시 response body에 담겨 있는 description를 desc에 담아줍니다. 그렇게 된다면 `<pre>{desc}</pre>`에서 **`검색 결과를 찾을 수 없습니다.`**를 랜더링하게 됩니다.

## 사용자가 api call를 요청하고 난 뒤 에러

사용자가 로그인, 로그아웃등 버튼을 클릭하거나 특정한 경우에 api call를 컴포넌트에서 요청하는 경우가 있습니다. 아래를 봅시다.

```tsx
function useErrorBoundary<ErrorType extends Error>() {
  const [error, setError] = useState<ErrorType | null>(null);

  if (error != null) {
    throw error;
  }

  return setError;
}

function ErrorHandle({}: ErrorHandleProps) {
  const setError = useErrorBoundary();

  const fetchData = async () => {
    try {
      await TestingService.fetchError();
    } catch (error) {
      if (isAxiosError(error)) {
        switch (error.response?.data.description) {
          case "잘못된 이메일 형식":
            return setError(error);
          case "anythong":
            return "아무처리나하세요!";
          default:
            return setError(error);
        }
      }
    }
  };

  return (
    <div>
      <button onClick={fetchData}>API 통신</button>
    </div>
  );
}
```

`ErrorHandle` 구현체를 보면 `isAxiosError`를 이용하여 AxiosError를 체크 한 뒤에 그에 따른 description에 따라 에러 처리를 하고 있습니다. `useErrorBoundary` custom hook을 이용하고 있는데 이 hook은 단순이 에러를 던지는 기능을 합니다. 즉 `catch로 잡은 에러를 다시 외부로 위임`시키기 위해 throw error를 사용합니다.

즉 다시 에러 객체는 외부로 위임 되게 되고 AsyncBoundary의 fallback으로 지정한 컴포넌트가 에러 객체를 받게 됩니다.

## 정리

AsyncBoundary를 이용하게 되면 데이터 팬딩 중 랜더링 처리와 에러처리를 외부로 위임하므로써 내부 컴포넌트 로직을 신경 쓸 수 있으며 에러 객체를 활용하여 에러 핸들링이 쉽게 가능합니다.

## refs

[https://jbee.io/react/error-declarative-handling-3/](https://jbee.io/react/error-declarative-handling-3/)
