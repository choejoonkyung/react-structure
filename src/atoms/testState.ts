import TestingService, { TestEntity } from "lib/api/TestingService";
import { selectorFamily, useRecoilValue } from "recoil";

const testRejectSelector = selectorFamily<TestEntity, number>({
  key: "testState",
  get:
    (ms) =>
    async ({ get }) => {
      const response = await TestingService.reject(ms);
      return response;
    },
});

const testResolveSelector = selectorFamily<TestEntity, number>({
  key: "testState",
  get:
    (ms) =>
    async ({ get }) => {
      const response = await TestingService.resovle(ms);
      return response;
    },
});

export function useTestReject(ms: number) {
  return useRecoilValue(testRejectSelector(ms));
}

export function useTestResolve(ms: number) {
  return useRecoilValue(testResolveSelector(ms));
}
