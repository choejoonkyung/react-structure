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
  private static createClient() {
    const client = axios.create({});
    client.defaults.baseURL = "https://api.music.msub.kr";
    return client;
  }

  static search(keyword: string) {
    return this.createClient().get<MusicReleaseEntity>(`/?song=${keyword}`);
  }
}

export default MusicService;
