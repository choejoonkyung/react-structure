import { useTestMusicApiError } from "atoms/testState";

type MusicApiErrorProps = {};

function MusicApiError({}: MusicApiErrorProps) {
  const result = useTestMusicApiError();
  return <div>{}</div>;
}

export default MusicApiError;
