export interface MusicEntity {
  name: string;
  artist: string;
  album: string;
  albumimg: string;
  date: string;
  melonlink: string;
  kakaomelonlink: string;
  lyrics: string;
}

export interface MusicReleaseEntity {
  type: string;
  status: string;
  lineup: string[];
  song: MusicEntity[];
}

export class Music {
  name: string;
  artist: string;
  album: string;
  albumimg: string;
  date: string;
  melonlink: string;
  kakaomelonlink: string;
  lyrics: string;
  constructor(entity: MusicEntity) {
    const {
      album,
      name,
      artist,
      albumimg,
      date,
      melonlink,
      kakaomelonlink,
      lyrics,
    } = entity;
    this.album = album;
    this.name = name;
    this.artist = artist;
    this.albumimg = albumimg;
    this.date = date;
    this.melonlink = melonlink;
    this.kakaomelonlink = kakaomelonlink;
    this.lyrics = lyrics;
  }

  public checkNewRelease(date: string) {
    return true;
  }
}

export class MusicList {
  list: Music[];

  constructor(list: Music[]) {
    this.list = list;
  }
}
