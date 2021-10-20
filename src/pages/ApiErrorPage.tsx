import React, { Suspense } from "react";
import ErrorTestNotice from "components/@base/Test/ErrorTestNotice";
import { ErrorBoundary } from "react-error-boundary";
import ApiError from "components/@base/Test/ApiError";

function ApiErrorPage() {
  return (
    <div>
      <ErrorBoundary FallbackComponent={ErrorTestNotice}>
        <Suspense fallback={<div>...loading</div>}>
          <ApiError />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default ApiErrorPage;
