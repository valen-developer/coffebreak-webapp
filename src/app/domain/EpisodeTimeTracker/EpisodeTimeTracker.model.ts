import { UUID } from '../Shared/valueObjects/Uuid.valueObject';
import { EpisodeTimeTrackerTime } from './valueObjects/EpisodeTimeTrackerTime.valueObject';

export class EpisodeTimeTracker {
  public readonly uuid: UUID;

  public readonly episodeUuid: UUID;
  public readonly userUuid: UUID;
  public readonly time: EpisodeTimeTrackerTime;

  constructor(params: EpisodeTimeTrackerDTO) {
    this.uuid = new UUID(params.uuid);
    this.episodeUuid = new UUID(params.episodeUuid);
    this.userUuid = new UUID(params.userUuid);
    this.time = new EpisodeTimeTrackerTime(params.time);
  }

  public toDto(): EpisodeTimeTrackerDTO {
    return {
      uuid: this.uuid.value,
      episodeUuid: this.episodeUuid.value,
      userUuid: this.userUuid.value,
      time: this.time.value,
    };
  }
}

export interface EpisodeTimeTrackerDTO {
  uuid: string;
  episodeUuid: string;
  userUuid: string;
  time: number;
}
