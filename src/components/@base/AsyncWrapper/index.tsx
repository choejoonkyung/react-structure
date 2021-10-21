import React, { ReactNode, Suspense, SuspenseProps } from "react";
import {
  ErrorBoundary,
  ErrorBoundaryPropsWithFallback,
} from "react-error-boundary";

type ExceptFallbackErrorBoundaryAttributes = Omit<
  ErrorBoundaryPropsWithFallback,
  "fallback"
>;

type AsyncWrapperProps = {
  children: ReactNode;
  ErrorFallback: ErrorBoundaryPropsWithFallback["fallback"];
  SuspenseFallback: SuspenseProps["fallback"];
} & ExceptFallbackErrorBoundaryAttributes;

function AsyncWrapper({
  children,
  ErrorFallback,
  SuspenseFallback,
  ...restErrorBoundaryAttributes
}: AsyncWrapperProps) {
  return (
    <ErrorBoundary fallback={ErrorFallback} {...restErrorBoundaryAttributes}>
      <Suspense fallback={SuspenseFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
}

export default AsyncWrapper;
