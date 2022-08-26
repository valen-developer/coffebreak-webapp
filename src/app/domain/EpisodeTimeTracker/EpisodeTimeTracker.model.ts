import { PodcastDuration } from '../PodcastEpisode/valueObjects/PodcastDuration.valueObject';
import { UUID } from '../Shared/valueObjects/Uuid.valueObject';
import { EpisodeTimeTrackerTime } from './valueObjects/EpisodeTimeTrackerTime.valueObject';

export class EpisodeTimeTracker {
  public readonly uuid: UUID;

  public readonly episodeUuid: UUID;
  public readonly time: EpisodeTimeTrackerTime;
  public readonly episodeDuration: PodcastDuration;

  constructor(params: EpisodeTimeTrackerDTO) {
    this.uuid = new UUID(params.uuid);
    this.episodeUuid = new UUID(params.episodeUuid);
    this.time = new EpisodeTimeTrackerTime(params.time);
    this.episodeDuration = new PodcastDuration(params.episodeDuration);
  }

  public toDto(): EpisodeTimeTrackerDTO {
    return {
      uuid: this.uuid.value,
      episodeUuid: this.episodeUuid.value,
      time: this.time.value,
      episodeDuration: this.episodeDuration.value,
    };
  }

  public percentageComplete(): number {
    return this.time.value / this.episodeDuration.value;
  }

  public isComplete(): boolean {
    const threshold = 0.9;
    return this.percentageComplete() > threshold;
  }
}

export interface EpisodeTimeTrackerDTO {
  uuid: string;
  episodeUuid: string;
  time: number;
  episodeDuration: number;
}
