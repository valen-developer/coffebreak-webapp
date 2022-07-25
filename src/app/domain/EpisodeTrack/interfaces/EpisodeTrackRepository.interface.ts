import { EpisodeTrack } from '../EpisodeTrack.model';

export abstract class EpisodeTrackRepository {
  abstract findByEpisode(episodeUuid: string): Promise<EpisodeTrack[]>;
}
