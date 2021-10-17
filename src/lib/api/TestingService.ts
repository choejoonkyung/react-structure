export type TestEntity = {
  success: boolean;
};

class TestingService {
  static reject(ms: number) {
    return new Promise<TestEntity>((_, reject) => {
      setTimeout(
        () =>
          reject({
            success: false,
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
          }),
        ms
      );
    });
  }
}

export default TestingService;
