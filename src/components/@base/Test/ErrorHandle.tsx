import TestingService from "lib/api/TestingService";

type ErrorHandleProps = {};

function ErrorHandle({}: ErrorHandleProps) {
  const fetchData = async () => {
    try {
      await TestingService.fetchError();
    } catch (error) {
      throw error;
    }
  };

  return (
    <div>
      <button onClick={fetchData}>API 통신</button>
    </div>
  );
}

export default ErrorHandle;
