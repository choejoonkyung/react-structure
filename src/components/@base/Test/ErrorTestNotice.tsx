import { FallbackProps } from "react-error-boundary";

type ErrorTestNoticeProps = {} & FallbackProps;

function ErrorTestNotice({ ...errorProps }: ErrorTestNoticeProps) {
  console.log(errorProps);

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{errorProps.error.message}</pre>
      <button
        onClick={() => errorProps.resetErrorBoundary(Math.random() * 3000)}
      >
        Try again
      </button>
    </div>
  );
}

export default ErrorTestNotice;
