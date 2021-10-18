import Input from "components/@base/Input";
import MusicList from "components/MusicList";
import { Suspense, useState } from "react";

function SearchMusicPage() {
  const [keyword, setKeyword] = useState("");
  return (
    <div>
      <Input onChange={(e) => setKeyword(e.target.value)} />
      <Suspense fallback={<div>...loading</div>}>
        <MusicList keyword={keyword} />
      </Suspense>
    </div>
  );
}

export default SearchMusicPage;
