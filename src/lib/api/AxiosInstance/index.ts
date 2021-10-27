import axios from "axios";

class AxiosInstance {
  private static DEFAULT_URL = "https://httpbin.org";
  private static TIME_OUT = 3000;

  static createInstance(baseUrl?: string) {
    return axios.create({
      baseURL: baseUrl ? baseUrl : AxiosInstance.DEFAULT_URL,
      timeout: AxiosInstance.TIME_OUT,
    });
  }

  static getInstance(endpoint: string) {
    return axios.get(AxiosInstance.DEFAULT_URL + endpoint, {
      timeout: AxiosInstance.TIME_OUT,
    });
  }

  static postInstance<T>(endpoint: string, data: T) {
    return axios.post(AxiosInstance.DEFAULT_URL + endpoint, data, {
      timeout: AxiosInstance.TIME_OUT,
    });
  }

  static putInstance<T>(endpoint: string, data: T) {
    return axios.put(AxiosInstance.DEFAULT_URL + endpoint, data, {
      timeout: AxiosInstance.TIME_OUT,
    });
  }

  static patchInstance<T>(endpoint: string, data: T) {
    return axios.patch(AxiosInstance.DEFAULT_URL + endpoint, data, {
      timeout: AxiosInstance.TIME_OUT,
    });
  }
}

export default AxiosInstance;
