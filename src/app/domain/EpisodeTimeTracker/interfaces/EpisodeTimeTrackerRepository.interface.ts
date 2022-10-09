import { Observable } from 'rxjs';
import { EpisodeTimeTracker } from '../EpisodeTimeTracker.model';

export abstract class EpisodeTimeTrackerRepository {
  abstract save(episodeTimeTracker: EpisodeTimeTracker): Promise<void>;
  abstract update(episodeTimeTracker: EpisodeTimeTracker): Promise<void>;
  abstract findByUser(): Observable<EpisodeTimeTracker[]>;
  abstract findLastByUser(): Promise<EpisodeTimeTracker[]>;
}
