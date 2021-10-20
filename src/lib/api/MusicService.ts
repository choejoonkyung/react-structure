import axios from "axios";

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
  private static URL = "https://api.music.msub.kr";
  private static TIME_OUT = 3000;

  private static createClient() {
    const client = axios.create({
      baseURL: MusicService.URL,
      timeout: MusicService.TIME_OUT,
    });
    return client;
  }

  static search(keyword: string) {
    return MusicService.createClient().get<MusicReleaseEntity>(
      `/?song=${keyword}`
    );
  }
}

export default MusicService;
