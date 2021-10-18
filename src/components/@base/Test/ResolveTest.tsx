import { useTestResolve } from "atoms/testState";

type ResolveTestProps = {
  ms: number;
};

function ResolveTest({ ms }: ResolveTestProps) {
  const result = useTestResolve(ms);
  return <div>{result.success && "패칭 성공!"}</div>;
}

export default ResolveTest;
