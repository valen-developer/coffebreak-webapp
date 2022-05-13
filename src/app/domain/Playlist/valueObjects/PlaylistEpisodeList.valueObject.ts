import { ValueObject } from '../../Shared/valueObjects/ValueObject.interface';

export class PlaylistEpisodeList implements ValueObject {
  public value: string[] = [];

  constructor(value: string[]) {
    this.value = value;
  }

  public removeEpisode(episodeUuid: string): void {
    this.value = this.value.filter((uuid: string) => uuid !== episodeUuid);
  }

  public addEpisode(episodeUuid: string): void {
    this.value.push(episodeUuid);
  }
}
