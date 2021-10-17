import { useTestReject } from "atoms/testState";

type RejectTestProps = {
  ms: number;
};

function RejectTest({ ms }: RejectTestProps) {
  const result = useTestReject(ms);
  return <div>{result.success}</div>;
}

export default RejectTest;
