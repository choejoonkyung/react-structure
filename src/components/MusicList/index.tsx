import React from "react";
import { useSearchMusicList } from "atoms/musicState";

type MusicListProps = {
  keyword: string;
};

function MusicList({ keyword }: MusicListProps) {
  const musicList = useSearchMusicList(keyword);

  return (
    <ul>
      {musicList.map((song, i) => (
        <li key={`song-${i}`}>
          {song.name} - {song.artist}
        </li>
      ))}
    </ul>
  );
}

export default MusicList;
