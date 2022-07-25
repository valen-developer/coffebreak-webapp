import { UUID } from '../Shared/valueObjects/Uuid.valueObject';
import { EpisodeTrackDescription } from './valueObject/EpisodeTrackDescription.valueObject';
import { EpisodeTrackTime } from './valueObject/EpisodeTrackTime.valueObject';

export class EpisodeTrack {
  public readonly uuid: UUID;
  public readonly episodeUuid: UUID;
  public readonly description: EpisodeTrackDescription;
  public readonly time: EpisodeTrackTime;

  constructor(dto: EpisodeTrackDto) {
    this.uuid = new UUID(dto.uuid);
    this.episodeUuid = new UUID(dto.episodeUuid);
    this.description = new EpisodeTrackDescription(dto.description);
    this.time = new EpisodeTrackTime(dto.time);
  }

  public toDto(): EpisodeTrackDto {
    return {
      uuid: this.uuid.value,
      episodeUuid: this.episodeUuid.value,
      description: this.description.value,
      time: this.time.value,
    };
  }
}

export interface EpisodeTrackDto {
  uuid: string;
  time: string;
  description: string;
  episodeUuid: string;
}
