import { Music } from "Data/Music";
import MusicService from "lib/api/MusicService";
import { selectorFamily, useRecoilValue } from "recoil";

const musicSelector = selectorFamily<Music[], string>({
  key: "musicState",
  get:
    (keyword) =>
    async ({ get }) => {
      const response = await MusicService.search(keyword);
      const list = response.data.song.reduce<Music[]>(
        (acc, song) => (acc = [...acc, new Music(song)]),
        []
      );
      return list;
    },
});

export function useSearchMusicList(keyword: string) {
  return useRecoilValue(musicSelector(keyword));
}
