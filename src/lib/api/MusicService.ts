import axios, { Axios } from "axios";
import AxiosService from "./AxiosService";

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
    return AxiosService.createClient().get<MusicReleaseEntity>(
      `/?song=${keyword}`
    );
  }
}

export default MusicService;
