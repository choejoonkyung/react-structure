import { MusicReleaseEntity } from "Entity/Music";
import AxiosInstance from "./AxiosInstance";

class MusicService {
  static search(keyword: string) {
    return AxiosInstance.createInstance().get<MusicReleaseEntity>(
      `/?song=${keyword}`
    );
  }
}

export default MusicService;
