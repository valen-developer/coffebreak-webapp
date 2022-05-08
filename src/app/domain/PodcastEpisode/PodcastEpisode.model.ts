import { UUID } from '../Shared/valueObjects/Uuid.valueObject';
import { PodcastAudioUrl } from './valueObjects/PodcastAudioUrl.valueObject';
import { PodcastDescription } from './valueObjects/PodcastDescription.valueObject';
import { PodcastDuration } from './valueObjects/PodcastDuration.valueObject';
import { PodcastImageUrl } from './valueObjects/PodcastImageUrl.valueObject';
import { PodcastPubDate } from './valueObjects/PodcastPubDate.valueObject';
import { PodcastTitle } from './valueObjects/PodcastTitle.valueObject';

export class PodcastEpisode {
  public readonly uuid: UUID;
  public readonly title: PodcastTitle;
  public readonly description: PodcastDescription;
  public readonly pubDate: PodcastPubDate;
  public readonly duration: PodcastDuration;
  public readonly imageUrl: PodcastImageUrl;
  public readonly audioUrl: PodcastAudioUrl;

  public episode: number;

  constructor(dto: PodcastEpisodeDTO) {
    this.uuid = new UUID(dto.uuid);
    this.title = new PodcastTitle(dto.title);
    this.description = new PodcastDescription(dto.description);
    this.duration = new PodcastDuration(dto.duration);
    this.imageUrl = new PodcastImageUrl(dto.imageUrl);
    this.audioUrl = new PodcastAudioUrl(dto.audioUrl);
    this.pubDate = PodcastPubDate.fromString(dto.pubDate);

    this.episode = dto.episode;
  }

  public toDTO(): PodcastEpisodeDTO {
    return {
      uuid: this.uuid.value,
      title: this.title.value,
      description: this.description.value,
      duration: this.duration.value,
      imageUrl: this.imageUrl.value,
      audioUrl: this.audioUrl.value,
      pubDate: this.pubDate.value.toString(),
      episode: this.episode,
    };
  }
}

export interface PodcastEpisodeDTO {
  uuid: string;
  title: string;
  description: string;
  pubDate: string;
  duration: number;
  imageUrl: string;
  audioUrl: string;
  episode: number;
}
