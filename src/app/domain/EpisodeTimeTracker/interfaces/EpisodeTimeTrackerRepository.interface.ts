import { Paginator } from '../../Shared/interfaces/Paginator.interface';
import {
  EpisodeTimeTracker,
  EpisodeTimeTrackerDTO,
} from '../EpisodeTimeTracker.model';

export abstract class EpisodeTimeTrackerRepository {
  abstract save(episodeTimeTracker: EpisodeTimeTracker): Promise<void>;
  abstract update(episodeTimeTracker: EpisodeTimeTracker): Promise<void>;
  abstract findByUser(userUuid: string): Promise<EpisodeTimeTracker[]>;
  abstract filter(
    query: any,
    paginator: Paginator<EpisodeTimeTrackerDTO>
  ): Promise<EpisodeTimeTracker[]>;
}
