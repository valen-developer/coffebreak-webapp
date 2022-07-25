import { Paginated } from 'src/app/helpers/Paginated';
import { PodcastEpisode } from '../../PodcastEpisode/PodcastEpisode.model';
import { Artist } from '../Artist.model';
import { ArtistQuery } from '../ArtistQuery';

export abstract class ArtistRepository {
  abstract find(uuid: string): Promise<Artist>;
  abstract findAll(): Promise<Artist[]>;
  abstract findEpisodes(uuid: string): Promise<PodcastEpisode[]>;
  abstract filter(query: ArtistQuery): Promise<Paginated<Artist[], 'artists'>>;
}
