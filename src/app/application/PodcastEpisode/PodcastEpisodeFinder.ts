import { Injectable } from '@angular/core';
import { PodcastEpisodeRepository } from 'src/app/domain/PodcastEpisode/interfaces/PodcastEpisodeRepository.interface';
import {
  PodcastEpisode,
  PodcastEpisodeDTO,
} from 'src/app/domain/PodcastEpisode/PodcastEpisode.model';
import { PodcastEpisodeQuery } from 'src/app/domain/PodcastEpisode/PodcastEpisodeQuery';
import { Paginator } from 'src/app/domain/Shared/interfaces/Paginator.interface';
import { Paginated } from 'src/app/helpers/Paginated';

@Injectable({ providedIn: 'root' })
export class PodcastEpisodeFinder {
  constructor(private podcastEpisodeRepository: PodcastEpisodeRepository) {}

  public lastMonths(monthCount: number): Promise<PodcastEpisode[]> {
    // fromDate is actual minus monthCount
    const fromDate = new Date();
    fromDate.setMonth(fromDate.getMonth() - monthCount);

    // toDate is actual
    const toDate = new Date();

    const query: PodcastEpisodeQuery = {
      pubDate_gte: fromDate,
      pubDate_lte: toDate,
    };

    const paginator: Paginator<PodcastEpisodeDTO> = {
      sort_by: 'pubDate',
      order: 'desc',
    };

    return this.filter(query, paginator).then(({ episodes }) => episodes);
  }

  public async filter(
    query: PodcastEpisodeQuery,
    paginator: Paginator<PodcastEpisodeDTO>
  ): Promise<Paginated<PodcastEpisode[], 'episodes'>> {
    return await this.podcastEpisodeRepository.filter(query, paginator);
  }

  public async find(uuid: string): Promise<PodcastEpisode> {
    const episode = await this.podcastEpisodeRepository
      .filter(
        {
          uuid_equals: uuid,
        },
        {}
      )
      .then(({ episodes }) => episodes[0]);

    return episode;
  }
}
