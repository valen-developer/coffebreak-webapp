import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { EpisodeTimeTracker } from 'src/app/domain/EpisodeTimeTracker/EpisodeTimeTracker.model';
import { EpisodeTimeTrackerRepository } from 'src/app/domain/EpisodeTimeTracker/interfaces/EpisodeTimeTrackerRepository.interface';
import { EpisodeTimeTrackerStore } from './EpisodeTimeTrackerStore.service';

@Injectable({
  providedIn: 'root',
})
export class EpisodeTimeTrackerFinder {
  constructor(
    private timeTrakerRepository: EpisodeTimeTrackerRepository,
    private timeTrackerStore: EpisodeTimeTrackerStore
  ) {}

  public findByUser(userUuid: string): Observable<EpisodeTimeTracker[]> {
    return this.timeTrakerRepository.findByUser(userUuid).pipe(
      tap((timeTrackers) => {
        this.timeTrackerStore.setTimeTrackers(timeTrackers);
      })
    );
  }
}
