import { Injectable } from '@angular/core';
import { firstValueFrom, map, Observable } from 'rxjs';
import {
  EpisodeTimeTracker,
  EpisodeTimeTrackerDTO,
} from 'src/app/domain/EpisodeTimeTracker/EpisodeTimeTracker.model';
import { EpisodeTimeTrackerRepository } from 'src/app/domain/EpisodeTimeTracker/interfaces/EpisodeTimeTrackerRepository.interface';
import { Paginator } from 'src/app/domain/Shared/interfaces/Paginator.interface';
import { environment } from 'src/environments/environment';
import { ApiRepository } from '../Shared/ApiRepository';

@Injectable({
  providedIn: 'root',
})
export class ApiEpisodeTimeTrackerRepository
  extends ApiRepository
  implements EpisodeTimeTrackerRepository
{
  private _API_URL = environment.apiUrl;

  public async save(episodeTimeTracker: EpisodeTimeTracker): Promise<void> {
    const response = this.http.post(
      `${this._API_URL}/episode-time-tracker`,
      episodeTimeTracker.toDto()
    );

    await firstValueFrom(response);
  }

  public async update(episodeTimeTracker: EpisodeTimeTracker): Promise<void> {
    const response = this.http.put(
      `${this._API_URL}/episode-time-tracker`,
      episodeTimeTracker.toDto()
    );

    await firstValueFrom(response);
  }

  public findByUser(): Observable<EpisodeTimeTracker[]> {
    return this.http
      .get<EpisodeTimeTrackerDTO[]>(
        `${this._API_URL}/episode-time-tracker/user`
      )
      .pipe(
        map((timeTrackers: EpisodeTimeTrackerDTO[]) =>
          timeTrackers.map(
            (timeTracker: EpisodeTimeTrackerDTO) =>
              new EpisodeTimeTracker(timeTracker)
          )
        )
      );
  }
}
