import { Paginated } from 'src/app/helpers/Paginated';
import { Paginator } from '../../Shared/interfaces/Paginator.interface';
import { PodcastEpisode, PodcastEpisodeDTO } from '../PodcastEpisode.model';
import { PodcastEpisodeQuery } from '../PodcastEpisodeQuery';

export abstract class PodcastEpisodeRepository {
  abstract filter(
    query: PodcastEpisodeQuery,
    paginator: Paginator<PodcastEpisodeDTO>
  ): Promise<Paginated<PodcastEpisode[], 'episodes'>>;
}
