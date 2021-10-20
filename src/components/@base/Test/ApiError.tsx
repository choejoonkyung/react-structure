import { useTestApiError } from "atoms/testState";

type ApiErrorProps = {};

function ApiError({}: ApiErrorProps) {
  const result = useTestApiError();
  return <div>{result}</div>;
}

export default ApiError;
