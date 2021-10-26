import AxiosInstance from "./AxiosInstance";

export type SongEntity = {
  name: string;
  artist: string;
  album: string;
  albumimg: string;
  date: string;
  melonlink: string;
  kakaomelonlink: string;
  lyrics: string;
};

export type MusicReleaseEntity = {
  type: string;
  status: string;
  lineup: string[];
  song: SongEntity[];
};

class MusicService {
  static search(keyword: string) {
    return AxiosInstance.createInstance().get<MusicReleaseEntity>(
      `/?song=${keyword}`
    );
  }
}

export default MusicService;
