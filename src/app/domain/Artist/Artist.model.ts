import { UUID } from '../Shared/valueObjects/Uuid.valueObject';
import { ArtistEpisodeList } from './valueObjects/ArtistEpisodeList';
import { ArtistName } from './valueObjects/ArtistName';

export class Artist {
  public readonly uuid: UUID;
  public readonly name: ArtistName;

  private _episodes: ArtistEpisodeList;

  constructor(dto: ArtistDTO) {
    this.uuid = new UUID(dto.uuid);
    this.name = new ArtistName(dto.name);
    this._episodes = new ArtistEpisodeList(dto.episodes ?? []);
  }

  public getEpisodes(): number[] {
    return this._episodes.episodes;
  }

  public setEpisodes(episodes: number[]): void {
    this._episodes = new ArtistEpisodeList(episodes);
  }

  toDto(): ArtistDTO {
    return {
      uuid: this.uuid.value,
      name: this.name.value,
      episodes: this.getEpisodes(),
    };
  }
}

export interface ArtistDTO {
  uuid: string;
  name: string;
  episodes?: number[];
}
