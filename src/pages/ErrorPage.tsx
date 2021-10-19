import React, { Suspense, useState } from "react";
import RejectTest from "components/@base/Test/RejectTest";
import ErrorTestNotice from "components/@base/Test/ErrorTestNotice";
import { ErrorBoundary } from "react-error-boundary";
import ResolveTest from "components/@base/Test/ResolveTest";

function ErrorPage() {
  const [millisecond, setMillisecond] = useState(3000);
  return (
    <div>
      <ErrorBoundary
        FallbackComponent={ErrorTestNotice}
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
