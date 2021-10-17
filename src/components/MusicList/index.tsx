import { useSearchMusicList } from "atoms/musicState";

type MusicListProps = {
  keyword: string;
};

function MusicList({ keyword }: MusicListProps) {
  const result = useSearchMusicList(keyword);

  return (
    <ul>
      {result.song.map((song, i) => (
        <li key={`song-${i}`}>
          {song.name} - {song.artist}
        </li>
      ))}
    </ul>
  );
}

export default MusicList;
