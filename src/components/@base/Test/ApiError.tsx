import { useTestApiError } from "atoms/testState";

type ApiErrorProps = {};

function ApiError({}: ApiErrorProps) {
  useTestApiError();
  return <div></div>;
}

export default ApiError;
