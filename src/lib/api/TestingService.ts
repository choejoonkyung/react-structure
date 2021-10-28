import AxiosInstance from "./AxiosInstance";

export type TestEntity = {
  success: boolean;
  status: number;
};

class TestingService {
  static apiError() {
    return AxiosInstance.createInstance().get(`/?fail`);
  }

  static musicApiError() {
    return AxiosInstance.createInstance().get(`/song=야생화`);
  }

  static fetchError() {
    return AxiosInstance.createInstance().get(`/get2`);
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
