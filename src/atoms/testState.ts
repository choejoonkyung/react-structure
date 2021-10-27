import TestingService, { TestEntity } from "lib/api/TestingService";
import { selector, selectorFamily, useRecoilValue } from "recoil";

const testRejectSelector = selectorFamily<TestEntity, number>({
  key: "testRejectState",
  get:
    (ms) =>
    async ({ get }) => {
      const response = await TestingService.reject(ms);
      return response;
    },
});

const testResolveSelector = selectorFamily<TestEntity, number>({
  key: "testResolveState",
  get:
    (ms) =>
    async ({ get }) => {
      const response = await TestingService.resovle(ms);
      return response;
    },
});

const testForbiddenSelector = selectorFamily<TestEntity, number>({
  key: "testForbiddenState",
  get:
    (ms) =>
    async ({ get }) => {
      const response = await TestingService.forbidden(ms);
      return response;
    },
});

const testApiError = selector({
  key: "testApiState",
  get: async ({ get }) => {
    const response = await TestingService.apiError();
    return response;
  },
});

const testMusicApiError = selector({
  key: "testMusicApiState",
  get: async ({ get }) => {
    const response = await TestingService.musicApiError();
    return response;
  },
});

const testFetchError = selector({
  key: "testMusicApiState",
  get: async ({ get }) => {
    const response = await TestingService.fetchError();

    return response;
  },
});

export function useTestReject(ms: number) {
  return useRecoilValue(testRejectSelector(ms));
}

export function useTestResolve(ms: number) {
  return useRecoilValue(testResolveSelector(ms));
}

export function useTestForbidden(ms: number) {
  return useRecoilValue(testForbiddenSelector(ms));
}

export function useTestApiError() {
  return useRecoilValue(testApiError);
}

export function useTestMusicApiError() {
  return useRecoilValue(testMusicApiError);
}

export function useTestFetchError() {
  return useRecoilValue(testFetchError);
}
