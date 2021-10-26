import axios, { AxiosError } from "axios";
import AxiosService from "./AxiosService";

export type TestEntity = {
  success: boolean;
  status: number;
};

class TestingService {
  static apiError() {
    return AxiosService.createClient().get(`/?fail`);
  }

  static musicApiError() {
    return AxiosService.createClient()
      .get(`song=야생화`)
      .catch((error) => console.log(error.response));
  }

  static fetchMusic() {
    return AxiosService.createClient().get(`?song=야생화`);
  }

  static reject(ms: number) {
    return new Promise<TestEntity>((_, reject) => {
      setTimeout(
        () =>
          reject({
            success: false,
            status: 400,
          }),
        ms
      );
    });
  }

  static resovle(ms: number) {
    return new Promise<TestEntity>((resolve) => {
      setTimeout(
        () =>
          resolve({
            success: true,
            status: 200,
          }),
        ms
      );
    });
  }

  static forbidden(ms: number) {
    return new Promise<TestEntity>((_, reject) => {
      setTimeout(
        () =>
          reject({
            success: true,
            status: 403,
          }),
        ms
      );
    });
  }
}

export default TestingService;
