import React, { Suspense, useState } from "react";
import Test from "components/@base/Test";
import ErrorNotice from "components/@base/Test/ErrorNotice";
import { ErrorBoundary } from "react-error-boundary";

function ErrorPage() {
  const [millisecond, setMillisecond] = useState(3000);
  return (
    <div>
      <ErrorBoundary
        FallbackComponent={ErrorNotice}
        onReset={(ms) => setMillisecond(ms as number)}
      >
        <Suspense fallback={<div>...loading</div>}>
          <Test ms={millisecond} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default ErrorPage;
