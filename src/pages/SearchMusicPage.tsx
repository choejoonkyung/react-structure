import Input from "components/@base/Input";
import ErrorTestNotice from "components/@base/Test/ErrorTestNotice";
import MusicList from "components/MusicList";
import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

function SearchMusicPage() {
  const [keyword, setKeyword] = useState("");
  return (
    <div>
      <Input onChange={(e) => setKeyword(e.target.value)} />
      <ErrorBoundary FallbackComponent={ErrorTestNotice}>
        <Suspense fallback={<div>...loading</div>}>
          <MusicList keyword={keyword} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default SearchMusicPage;
