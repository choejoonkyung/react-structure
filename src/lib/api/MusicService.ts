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
  private static url = "https://api.music.msub.kr";

  private static createClient() {
    const client = axios.create({});
    client.defaults.baseURL = MusicService.url;
    return client;
  }

  static search(keyword: string) {
    return MusicService.createClient().get<MusicReleaseEntity>(
      `/?song=${keyword}`
    );
  }
}

export default MusicService;
