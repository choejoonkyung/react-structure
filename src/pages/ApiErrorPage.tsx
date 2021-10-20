import React, { Suspense } from "react";
import ErrorTestNotice from "components/@base/Test/ErrorTestNotice";
import { ErrorBoundary } from "react-error-boundary";
import ApiError from "components/@base/Test/ApiError";
import MusicApiError from "components/@base/Test/MusicApiError";

function ApiErrorPage() {
  return (
    <div>
      <p>timeout example</p>
      <ErrorBoundary FallbackComponent={ErrorTestNotice}>
        <Suspense fallback={<div>...loading</div>}>
          <ApiError />
        </Suspense>
      </ErrorBoundary>

      <p>404 example</p>
      <ErrorBoundary FallbackComponent={ErrorTestNotice}>
        <Suspense fallback={<div>...loading</div>}>
          <MusicApiError />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default ApiErrorPage;
