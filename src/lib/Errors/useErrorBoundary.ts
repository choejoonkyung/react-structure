import { AxiosError } from "axios";
import { useState } from "react";

interface ErrorBody {
  code: number;
  message: string;
  description: string;
}

function useErrorBoundary<ErrorType extends Error>() {
  const [error, setError] = useState<ErrorType | null>(null);

  if (error != null) {
    throw error;
  }

  return setError;
}

function isAxiosError(res: unknown): res is AxiosError<ErrorBody> {
  if (typeof res !== "object" || res == null) {
    return false;
  }

  return true;
}

export { useErrorBoundary, isAxiosError };
