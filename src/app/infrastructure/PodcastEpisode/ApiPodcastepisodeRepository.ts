import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { PodcastEpisodeRepository } from 'src/app/domain/PodcastEpisode/interfaces/PodcastEpisodeRepository.interface';
import {
  PodcastEpisodeDTO,
  PodcastEpisode,
} from 'src/app/domain/PodcastEpisode/PodcastEpisode.model';
import { PodcastEpisodeQuery } from 'src/app/domain/PodcastEpisode/PodcastEpisodeQuery';
import { Paginator } from 'src/app/domain/Shared/interfaces/Paginator.interface';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiPodcastEpisodeRepository implements PodcastEpisodeRepository {
  private _API_URL = environment.apiUrl + '/episode';

  constructor(private http: HttpClient) {}

  public async filter(
    query: PodcastEpisodeQuery,
    paginator: Paginator<PodcastEpisodeDTO>
  ): Promise<PodcastEpisode[]> {
    const body = {
      ...query,
      ...paginator,
    };

    const request$ = this.http.post<{ episodes: PodcastEpisodeDTO[] }>(
      this._API_URL + '/filter',
      body
    );

    const { episodes } = await firstValueFrom(request$);

    return episodes.map((episodeDTO) => new PodcastEpisode(episodeDTO));
  }
}
