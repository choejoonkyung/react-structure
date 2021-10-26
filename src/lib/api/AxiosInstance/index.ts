import axios, { AxiosError } from "axios";

class AxiosInstance {
  private static DEFAULT_URL = "https://httpbin.org";
  private static TIME_OUT = 3000;

  static createInstance(baseUrl?: string) {
    return axios.create({
      baseURL: baseUrl ? baseUrl : AxiosInstance.DEFAULT_URL,
      timeout: AxiosInstance.TIME_OUT,
    });
  }

  static getInstance(endpoint: string, errorCb?: (err: AxiosError) => void) {
    return axios
      .get(AxiosInstance.DEFAULT_URL + endpoint, {
        timeout: AxiosInstance.TIME_OUT,
      })
      .catch((err) => {
        errorCb && errorCb(err);
      });
  }
}

export default AxiosInstance;
