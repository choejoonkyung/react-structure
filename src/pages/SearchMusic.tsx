import MusicList from "components/MusicList/MusicList";
import { Suspense } from "react";

function SearchMusic() {
  return (
    <div>
      <Suspense fallback={<div>...loading</div>}>
        <MusicList />
      </Suspense>
    </div>
  );
}

export default SearchMusic;
