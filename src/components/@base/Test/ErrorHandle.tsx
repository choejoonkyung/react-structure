import TestingService from "lib/api/TestingService";
import { useCallback } from "react";

type ErrorHandleProps = {};

function ErrorHandle({}: ErrorHandleProps) {
  const fetchData = useCallback(
    async () => await TestingService.musicApiError(),
    []
  );

  return (
    <div>
      <button onClick={fetchData}>API 통신</button>
    </div>
  );
}

export default ErrorHandle;
