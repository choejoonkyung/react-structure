import AsyncBoundary from "components/@base/AsyncBoundary";
import ErrorHandle from "components/@base/Test/ErrorHandle";
import DisplayError from "components/@base/Test/DisplayError";

function FetchErrorPage() {
  return (
    <AsyncBoundary
      ErrorFallback={(props) => <DisplayError {...props} />}
      SuspenseFallback={<div>...loading</div>}
    >
      <ErrorHandle />
    </AsyncBoundary>
  );
}

export default FetchErrorPage;
