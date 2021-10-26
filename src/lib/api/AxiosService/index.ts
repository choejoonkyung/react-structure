import axios from "axios";

class AxiosService {
  private static DEFAULT_URL = "https://api.music.msub.kr";
  private static TIME_OUT = 3000;

  static createClient(baseUrl?: string) {
    return axios.create({
      baseURL: baseUrl ? baseUrl : AxiosService.DEFAULT_URL,
      timeout: AxiosService.TIME_OUT,
    });
  }
}

export default AxiosService;
