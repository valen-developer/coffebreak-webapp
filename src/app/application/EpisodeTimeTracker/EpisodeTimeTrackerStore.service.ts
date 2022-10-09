import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EpisodeTimeTracker } from 'src/app/domain/EpisodeTimeTracker/EpisodeTimeTracker.model';
import { Nullable } from 'src/app/domain/Shared/types/Nullable.type';

@Injectable({
  providedIn: 'root',
})
export class EpisodeTimeTrackerStore {
  private _userTimeTrackers: EpisodeTimeTracker[] = [];
  private timeTrackersSubjet: BehaviorSubject<EpisodeTimeTracker[]>;
  public timeTrackers$: Observable<EpisodeTimeTracker[]>;

  constructor() {
    this.timeTrackersSubjet = new BehaviorSubject(this._userTimeTrackers);
    this.timeTrackers$ = this.timeTrackersSubjet.asObservable();
  }

  public getTimeTrackers(): EpisodeTimeTracker[] {
    return this._userTimeTrackers;
  }

  public getTimeTracker(episodeUuid: string): Nullable<EpisodeTimeTracker> {
    return this._userTimeTrackers.find(
      (item) => item.episodeUuid.value === episodeUuid
    );
  }

  public setTimeTrackers(timeTrackers: EpisodeTimeTracker[]): void {
    this._userTimeTrackers = timeTrackers;
    this.timeTrackersSubjet.next(timeTrackers);
  }

  public updateTimeTracker(timeTracker: EpisodeTimeTracker): void {
    const index = this._userTimeTrackers.findIndex(
      (item) => item.episodeUuid.value === timeTracker.episodeUuid.value
    );

    const hasTimeTracker = index !== -1;

    if (!hasTimeTracker) this._userTimeTrackers.push(timeTracker);
    if (hasTimeTracker) this._userTimeTrackers[index] = timeTracker;

    this.timeTrackersSubjet.next(this._userTimeTrackers);
  }
}
