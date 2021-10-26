import AxiosInstance from "./AxiosInstance";

export type TestEntity = {
  success: boolean;
  status: number;
};

class TestingService {
  static apiError() {
    return AxiosInstance.getInstance(`/?fail`);
  }

  static musicApiError() {
    return AxiosInstance.getInstance(`/song=야생화`, (err) => {});
  }

  static fetchError() {
    return AxiosInstance.getInstance(`/get2`, (err) => {
      console.log(err.response);
    });
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
