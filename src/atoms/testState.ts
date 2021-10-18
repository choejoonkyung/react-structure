import TestingService, { TestEntity } from "lib/api/TestingService";
import { selectorFamily, useRecoilValue } from "recoil";

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

export function useTestReject(ms: number) {
  return useRecoilValue(testRejectSelector(ms));
}

export function useTestResolve(ms: number) {
  return useRecoilValue(testResolveSelector(ms));
}

export function useTestForbidden(ms: number) {
  return useRecoilValue(testForbiddenSelector(ms));
}
