import { Injectable } from '@angular/core';

import { firstValueFrom } from 'rxjs';
import { PodcastEpisodeRepository } from 'src/app/domain/PodcastEpisode/interfaces/PodcastEpisodeRepository.interface';
import {
  PodcastEpisode,
  PodcastEpisodeDTO,
} from 'src/app/domain/PodcastEpisode/PodcastEpisode.model';
import { PodcastEpisodeQuery } from 'src/app/domain/PodcastEpisode/PodcastEpisodeQuery';
import { Paginator } from 'src/app/domain/Shared/interfaces/Paginator.interface';
import { environment } from 'src/environments/environment';
import { ApiRepository } from '../Shared/ApiRepository';

@Injectable({ providedIn: 'root' })
export class ApiPodcastEpisodeRepository
  extends ApiRepository
  implements PodcastEpisodeRepository
{
  private _API_URL = environment.apiUrl + '/episode';

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
