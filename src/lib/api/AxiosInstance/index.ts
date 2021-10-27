import axios from "axios";

class AxiosInstance {
  private static DEFAULT_URL = "https://api.music.msub.kr";
  private static TIME_OUT = 3000;

  static createInstance(baseUrl?: string) {
    return axios.create({
      baseURL: baseUrl ? baseUrl : AxiosInstance.DEFAULT_URL,
      timeout: AxiosInstance.TIME_OUT,
    });
  }
}

export default AxiosInstance;
