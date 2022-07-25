import { Injectable } from '@angular/core';

import { firstValueFrom } from 'rxjs';
import { PodcastEpisodeRepository } from 'src/app/domain/PodcastEpisode/interfaces/PodcastEpisodeRepository.interface';
import {
  PodcastEpisode,
  PodcastEpisodeDTO,
} from 'src/app/domain/PodcastEpisode/PodcastEpisode.model';
import { PodcastEpisodeQuery } from 'src/app/domain/PodcastEpisode/PodcastEpisodeQuery';
import { Paginator } from 'src/app/domain/Shared/interfaces/Paginator.interface';
import { Paginated } from 'src/app/helpers/Paginated';
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
  ): Promise<Paginated<PodcastEpisode[], 'episodes'>> {
    const body = {
      ...query,
      ...paginator,
    };

    const request$ = this.http.post<Paginated<PodcastEpisodeDTO[], 'episodes'>>(
      this._API_URL + '/filter',
      body
    );

    const { episodes, pages } = await firstValueFrom(request$);

    return {
      episodes: episodes.map((ep) => new PodcastEpisode(ep)),
      pages,
    };
  }
}
