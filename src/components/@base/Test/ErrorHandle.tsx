import TestingService from "lib/api/TestingService";
import { isAxiosError, useErrorBoundary } from "lib/Errors/useErrorBoundary";

type ErrorHandleProps = {};

function ErrorHandle({}: ErrorHandleProps) {
  const setError = useErrorBoundary();

  const fetchData = async () => {
    try {
      await TestingService.fetchError();
    } catch (error) {
      if (isAxiosError(error)) {
        switch (error.response?.data.description) {
          case "잘못된 이메일 형식":
            return setError(error);
          default:
            return setError(error);
        }
      }
    }
  };

  return (
    <div>
      <button onClick={fetchData}>API 통신</button>
    </div>
  );
}

export default ErrorHandle;
