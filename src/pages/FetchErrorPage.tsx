import AsyncBoundary from "components/@base/AsyncBoundary";
import ErrorHandle from "components/@base/Test/ErrorHandle";
import ErrorTestNotice from "components/@base/Test/ErrorTestNotice";

function FetchErrorPage() {
  return (
    <AsyncBoundary
      ErrorFallback={(props) => <ErrorTestNotice {...props} />}
      SuspenseFallback={<div>...loading</div>}
    >
      <ErrorHandle />
    </AsyncBoundary>
  );
}

export default FetchErrorPage;
