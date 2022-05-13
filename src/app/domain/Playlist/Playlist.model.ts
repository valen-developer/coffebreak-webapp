import { Nullable } from '../Shared/types/Nullable.type';
import { UUID } from '../Shared/valueObjects/Uuid.valueObject';
import { PlaylistDescription } from './valueObjects/PlaylistDescription.valueObject';
import { PlaylistEpisodeList } from './valueObjects/PlaylistEpisodeList.valueObject';
import { PlaylistName } from './valueObjects/PlaylistName.valueObject';
import { PlaylistOwn } from './valueObjects/PlaylistOwn.valueObject';

export class Playlist {
  public readonly uuid: UUID;
  public readonly name: PlaylistName;
  public readonly description: PlaylistDescription;

  private _own: PlaylistOwn;
  private _episodes: PlaylistEpisodeList;

  constructor(dto: PlaylistDTO) {
    this.uuid = new UUID(dto.uuid);
    this.name = new PlaylistName(dto.name);
    this.description = new PlaylistDescription(dto.description);

    this._own = new PlaylistOwn(dto.own);
    this._episodes = new PlaylistEpisodeList(dto.episodes ?? []);
  }

  public getOwn(): PlaylistOwn {
    return this._own;
  }

  public getEpisodes(): PlaylistEpisodeList {
    return this._episodes;
  }

  public addEpisode(episodeUuid: string): void {
    this._episodes.addEpisode(episodeUuid);
  }

  public removeEpisode(episodeUuid: string): void {
    this._episodes.removeEpisode(episodeUuid);
  }

  public toDTO(): PlaylistDTO {
    return {
      uuid: this.uuid.value,
      name: this.name.value,
      episodes: this._episodes.value,
      description: this.description.value,
      ...(this._own ? { own: this._own.value } : {}),
    };
  }
}

export interface PlaylistDTO {
  uuid: string;
  name: string;
  description: string;
  own?: Nullable<string>;
  episodes?: string[];
}
