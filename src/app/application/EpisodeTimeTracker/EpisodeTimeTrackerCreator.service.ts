import { Injectable } from '@angular/core';
import {
  EpisodeTimeTracker,
  EpisodeTimeTrackerDTO,
} from 'src/app/domain/EpisodeTimeTracker/EpisodeTimeTracker.model';
import { EpisodeTimeTrackerRepository } from 'src/app/domain/EpisodeTimeTracker/interfaces/EpisodeTimeTrackerRepository.interface';
import { UUIDGenerator } from 'src/app/domain/Shared/interfaces/UuidGenerator';
import { OmitMultiple } from 'src/app/helpers/OmitMultiple.type';

@Injectable({
  providedIn: 'root',
})
export class EpisodeTimeTrackerCreator {
  constructor(
    private timeTrackerRepository: EpisodeTimeTrackerRepository,
    private uuidGenerator: UUIDGenerator
  ) {}

  public async create(
    params: Omit<EpisodeTimeTrackerDTO, 'uuid'>
  ): Promise<EpisodeTimeTracker> {
    const timeTracker = new EpisodeTimeTracker({
      ...params,
      uuid: this.uuidGenerator.generate(),
    });

    await this.timeTrackerRepository.save(timeTracker);

    return timeTracker;
  }
}
