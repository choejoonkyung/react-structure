import React, { Suspense, useState } from "react";
import RejectTest from "components/@base/Test/RejectTest";
import ErrorNotice from "components/@base/Test/ErrorNotice";
import { ErrorBoundary } from "react-error-boundary";
import ResolveTest from "components/@base/Test/ResolveTest";

function ErrorPage() {
  const [millisecond, setMillisecond] = useState(3000);
  return (
    <div>
      <ErrorBoundary
        FallbackComponent={ErrorNotice}
        onReset={(ms) => setMillisecond(ms as number)}
      >
        <Suspense fallback={<div>...loading</div>}>
          {millisecond > 1000 ? (
            <RejectTest ms={millisecond} />
          ) : (
            <ResolveTest ms={millisecond} />
          )}
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default ErrorPage;
