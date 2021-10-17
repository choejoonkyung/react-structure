import { useTestReject } from "atoms/testState";

type TestProps = {
  ms: number;
};

function Test({ ms }: TestProps) {
  let result = useTestReject(ms);
  return <div>{result.success && "데이터 패칭 성공"}</div>;
}

export default Test;
