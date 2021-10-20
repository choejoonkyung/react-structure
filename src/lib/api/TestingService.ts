import axios from "axios";

export type TestEntity = {
  success: boolean;
  status: number;
};

class TestingService {
  private static URL = "https://reject.com/"; // 없는 url
  private static MUSIC_API_URL = "https://api.music.msub.kr";
  private static TIME_OUT = 3000;

  private static createClient() {
    const client = axios.create({
      baseURL: TestingService.URL,
      timeout: TestingService.TIME_OUT,
    });
    return client;
  }

  private static createMusicClient() {
    const client = axios.create({
      baseURL: TestingService.MUSIC_API_URL,
      timeout: TestingService.TIME_OUT,
    });

    return client;
  }

  static apiError() {
    return TestingService.createClient().get(`/?fail`);
  }

  static musicApiError() {
    return TestingService.createMusicClient().get(`song=야생화`);
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
