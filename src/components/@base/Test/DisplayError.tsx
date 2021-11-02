import { isAxiosError } from "lib/Errors/useErrorBoundary";
import { useEffect, useState } from "react";
import { FallbackProps } from "react-error-boundary";

type DisplayErrorProps = {} & FallbackProps;

function DisplayError({ error, resetErrorBoundary }: DisplayErrorProps) {
  const [desc, setDesc] = useState("");

  useEffect(() => {
    // custom error handling
    if (isAxiosError(error) && error.response) {
      setDesc(error.response.data.description);
    }
  }, []);

  return (
    <div role="alert">
      <p>에러가 발생 했습니다!</p>
      <pre>{desc}</pre>
      <button onClick={() => resetErrorBoundary()}>다시 시도</button>
    </div>
  );
}

export default DisplayError;
