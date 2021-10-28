import AxiosInstance from "./AxiosInstance";

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

class MusicService {
  static search(keyword: string) {
    return AxiosInstance.createInstance().get<MusicReleaseEntity>(
      `/?song=${keyword}`
    );
  }
}

export default MusicService;
