import { Injectable } from '@angular/core';
import {
  EpisodeTimeTracker,
  EpisodeTimeTrackerDTO,
} from 'src/app/domain/EpisodeTimeTracker/EpisodeTimeTracker.model';
import { EpisodeTimeTrackerRepository } from 'src/app/domain/EpisodeTimeTracker/interfaces/EpisodeTimeTrackerRepository.interface';
import { EpisodeTimeTrackerCreator } from './EpisodeTimeTrackerCreator.service';
import { EpisodeTimeTrackerStore } from './EpisodeTimeTrackerStore.service';

@Injectable({
  providedIn: 'root',
})
export class EpisodeTimeTrackerUpdater {
  constructor(
    private timeTrakerRepository: EpisodeTimeTrackerRepository,
    private timeTrackerCreator: EpisodeTimeTrackerCreator,
    private timeTrackerStore: EpisodeTimeTrackerStore
  ) {}

  public async update(
    params: Omit<EpisodeTimeTrackerDTO, 'uuid'>
  ): Promise<void> {
    const timeTracker = this.timeTrackerStore.getTimeTracker(
      params.episodeUuid
    );

    if (timeTracker)
      this.updateTimeTracker({
        ...timeTracker.toDto(),
        time: params.time,
      });
    if (!timeTracker) {
      const newTimeTracker = await this.create(params);
      this.timeTrackerStore.updateTimeTracker(newTimeTracker);
    }
  }

  private create(
    params: Omit<EpisodeTimeTrackerDTO, 'uuid'>
  ): Promise<EpisodeTimeTracker> {
    return this.timeTrackerCreator.create(params);
  }

  private updateTimeTracker(params: EpisodeTimeTrackerDTO): void {
    const updatedTimeTracker = new EpisodeTimeTracker(params);

    this.timeTrakerRepository.update(updatedTimeTracker);
    this.timeTrackerStore.updateTimeTracker(updatedTimeTracker);
  }
}
