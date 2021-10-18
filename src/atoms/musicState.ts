import MusicService, { MusicReleaseEntity } from "lib/api/MusicService";
import { selectorFamily, useRecoilValue } from "recoil";

const musicSelector = selectorFamily<MusicReleaseEntity, string>({
  key: "musicState",
  get:
    (keyword) =>
    async ({ get }) => {
      const response = await MusicService.search(keyword);
      return response.data;
    },
});

export function useSearchMusicList(keyword: string) {
  return useRecoilValue(musicSelector(keyword));
}
