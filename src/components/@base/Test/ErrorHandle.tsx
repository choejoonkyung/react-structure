import TestingService from "lib/api/TestingService";
import useErrorBoundary from "lib/Errors/useErrorBoundary";

type ErrorHandleProps = {};

function ErrorHandle({}: ErrorHandleProps) {
  const setError = useErrorBoundary();

  const fetchData = async () => {
    try {
      const result = await TestingService.fetchError();
      console.log(result);
    } catch (error) {
      console.log(error);
      //custom 에러처리
      if (error instanceof Error) {
        setError(error);
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
