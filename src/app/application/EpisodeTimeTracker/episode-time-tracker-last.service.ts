import { Injectable } from '@angular/core';
import { EpisodeTimeTracker } from 'src/app/domain/EpisodeTimeTracker/EpisodeTimeTracker.model';
import { EpisodeTimeTrackerRepository } from 'src/app/domain/EpisodeTimeTracker/interfaces/EpisodeTimeTrackerRepository.interface';

@Injectable({
  providedIn: 'root',
})
export class EpisodeTimeTrackerLastService {
  constructor(private timeTrackerRepository: EpisodeTimeTrackerRepository) {}

  public async findByUser(): Promise<EpisodeTimeTracker[]> {
    const timeTrackers = await this.timeTrackerRepository.findLastByUser();

    return timeTrackers;
  }
}
