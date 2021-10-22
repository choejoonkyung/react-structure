# AsyncBoundary

> AsyncBoundary는 Errorboundary와 Suspense
> 를 이용하여 데이터 패칭과 에러 핸들링을 보다 쉽게 관리하도록 만든 컴포넌트입니다.

## 구현체

react-error-boundary의 `ErrorBoundary`와 React의 `Suspense`를 합친 구현체인 `AsyncBoundary`의 모습입니다. 아래에서 어떤 방식으로 구현하였는지 하나하나 설명합니다.

```tsx
import React, { ReactNode, Suspense, SuspenseProps } from "react";
import {
  ErrorBoundary,
  ErrorBoundaryPropsWithRender,
} from "react-error-boundary";

type ExceptFallbackErrorBoundaryAttributes = Omit<
  ErrorBoundaryPropsWithRender,
  "fallbackRender" | "fallback" | "FallbackComponent"
>;

type AsyncBoundaryProps = {
  children: ReactNode;
  ErrorFallback: ErrorBoundaryPropsWithRender["fallbackRender"];
  SuspenseFallback: SuspenseProps["fallback"];
} & ExceptFallbackErrorBoundaryAttributes;

function AsyncBoundary({
  children,
  ErrorFallback,
  SuspenseFallback,
  ...restErrorBoundaryAttributes
}: AsyncBoundaryProps) {
  return (
    <ErrorBoundary
      fallbackRender={ErrorFallback}
      {...restErrorBoundaryAttributes}
    >
      <Suspense fallback={SuspenseFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
}

export default AsyncBoundary;
```

`ErrorBoundary`와 `Suspense`로 받아야 할 Props를 `AsyncBoundary`의 Props로 모두 받게 해야합니다.그 다음 `AsyncBoundary`의 chidren는 `Suspense`의 chidren으로 넘겨 줌으로 써 에러와 패칭처리를 외부로 위임 할 수 있는 형태로 만들어야 합니다.

### AsyncBoundary의 Props 설정하기

일단 ErrorBoundary의 Props와 Susense의 Props를 합치기 위해서 ErrorBoundary의 Props를 추출해야 합니다.

```tsx
type ExceptFallbackErrorBoundaryAttributes = Omit<
  ErrorBoundaryPropsWithRender,
  "fallbackRender" | "fallback" | "FallbackComponent"
>;
```

`ErrorBoundary`의 fallback에는 에러 발생 시 랜더링 할 컴포넌트가 들어가게 됩니다. 이 컴포넌트는 각 3가지 방식으로 넣어 줄 수 있습니다. 각각의 차이점은 [공식문서](https://www.npmjs.com/package/react-error-boundary)를 참조하면 됩니다. 우선 `AsyncBoundary`는 `fallbackRender`를 사용하게 됩니다. `ExceptFallbackErrorBoundaryAttributes` 타입에선 fallback 옵션들은 넣지 않고 `ErrorBoundary`가 에러 발생 시 랜더링 할 컴포넌트를 넣는 Props를 제외하고 나머진 옵션들만 넣기 위해서 Typescript의 유틸리티 타입인 `Omit`을 이용하여 fallback 관련 타입들은 `제거`합니다.

```tsx
type AsyncBoundaryProps = {
  children: ReactNode;
  ErrorFallback: ErrorBoundaryPropsWithRender["fallbackRender"];
  SuspenseFallback: SuspenseProps["fallback"];
} & ExceptFallbackErrorBoundaryAttributes;
```

이제 최종적으로 AsyncBoundaryProps를 정의해야합니다. `chidren`에는 감싸줄 컴포넌트가 들어오게 됩니다. `ErrorFallback`는 에러 발생 시 랜더링 할 컴포넌트를 넣어주기 위해 ErrorBoundaryPropsWithRender

타입에서 fallbackRender 옵션만 가져옵니다. `SuspenseFallback`도 마찬가지로 SuspenseProps에서

fallback옵션만 가져옵니다. 그 다음 Errorboundary의 나머지 옵션들을 받기 위해서 위에서 만든 `ExceptFallbackErrorBoundaryAttributes`를 & 연산자로 확장합니다.

```tsx
function AsyncBoundary({
  children,
  ErrorFallback,
  SuspenseFallback,
  ...restErrorBoundaryAttributes
}: AsyncBoundaryProps) {
  return (
    <ErrorBoundary
      fallbackRender={ErrorFallback}
      {...restErrorBoundaryAttributes}
    >
      <Suspense fallback={SuspenseFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
}

export default AsyncBoundary;
```

자. 이제 `AsyncBoundaryProps`는 Errorboundary의 Props와 Suspense의 Props를 모두 받을수 있게 되었습니다.이제 이제 각각 Props로 받은 값들을 제자리로 넣어줍니다. Errorboundary의 나머지 옵션들은 스프레드 연산자를 이용하여 `ErrorBoundary`의 Props로 넣어줍니다.

## 사용법

[앞선 포스팅](https://varletc0nst.tistory.com/38)에서 언급 하였듯이 React Suspense 컴포넌트에서 데이터를 가져오는 시점을 컨트롤 할려면 감싸준 컴포넌트가 React-query를 이용하여 [suspense 모드](https://react-query.tanstack.com/guides/suspense#_top)이거나 Recoil의 [비동기 셀렉터](https://recoiljs.org/ko/docs/guides/asynchronous-data-queries/)를 사용해야합니다. 이 예제에서는 `비동기 셀렉터`를 이용합니다.

```tsx
function RejectTest({ ms }: RejectTestProps) {
  const result = useTestReject(ms);
  return <div>{result.success}</div>;
}

export default RejectTest;
```

`RejectTest` 컴포넌트를 이용하여 테스트 하고자 합니다. `useTestReject` hook을 이용하여 데이터를 가져오고 성공 유무를 랜더링하는 컴포넌트입니다.

### 비동기 셀렉터의 모습 (useTestReject)

```tsx
class TestingService {
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
}

export default TestingService;

const testRejectSelector = selectorFamily<TestEntity, number>({
  key: "testRejectState",
  get:
    (ms) =>
    async ({ get }) => {
      const response = await TestingService.reject(ms);
      return response;
    },
});

export function useTestReject(ms: number) {
  return useRecoilValue(testRejectSelector(ms));
}
```

Recoil의 비동기 셀렉터를 이용하는 모습입니다. `TestingService`는 파라메터로 전달받은 millisec 만큼 기다리다가 reject를 시킵니다. 이 요청을 `testRejectSelector`에서 비동기 셀렉터로 연결합니다. 마지막으로 만든 셀렉터를 `useTestReject`라는 hook으로 따로 빼어낸 모습입니다.

### 실패하는 예시를 보며 최종적으로 사용해보기

```tsx
const [millisecond, setMillisecond] = useState(3000);
...

<AsyncBoundary
  ErrorFallback={(rest) => <ErrorTestNotice {...rest} />}
  SuspenseFallback={<div>...loading</div>}
  onReset={(ms) => setMillisecond(ms as number)}
>
  <RejectTest ms={millisecond} />
</AsyncBoundary>;
```

`AsyncBoundary`의 각각의 Props로 값들을 넣어준다음 `RejectTest`를 감싸줍니다. 이렇게 된다면 당연히 3초 후에 `ErrorTestNotice` 컴포넌트가 랜더링 될 것 입니다.

```tsx
import { FallbackProps } from "react-error-boundary";

type ErrorTestNoticeProps = {} & FallbackProps;

function ErrorTestNotice({ ...errorProps }: ErrorTestNoticeProps) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{errorProps.error.message}</pre>

      <button
        onClick={() => errorProps.resetErrorBoundary(Math.random() * 3000)}
      >
        Try again
      </button>
    </div>
  );
}

export default ErrorTestNotice;
```

`ErrorTestNotice`는 props로 `FallbackProps`를 받게 됩니다. 이 Props는 `에러 객체와 에러를 리셋 할 수 있는 콜백 함수`를 받게 됩니다. 최종적으로 버튼을 클릭 할 때마다 millisec가 랜덤으로 배정되며 `onReset`에 정의 된 대로 밖에 있는 종속 변수인 millisecond가 변경되면서 계속해서 에러 상황을 리셋 할 수 있습니다.

### 오류 상황이 아닐 떈?

오류 상황이 아닐 때는 데이터를 가져오는 동안에는 `<div>...loading</div>`가 랜더링 되가 최종적으로는

`AsyncBoundary`으로 감싼 컴포넌트가 잘 가져온 데이터로 아름답게 랜더링하게 될 것 입니다.
