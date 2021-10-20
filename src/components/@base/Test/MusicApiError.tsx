import { useTestMusicApiError } from "atoms/testState";

type MusicApiErrorProps = {};

function MusicApiError({}: MusicApiErrorProps) {
  useTestMusicApiError();
  return <div></div>;
}

export default MusicApiError;
