import { Provider } from '@angular/core';
import { LastEpisodesRepository } from './domain/PodcastEpisode/interfaces/LastEpisodesRepository.interface';
import { PodcastEpisodeRepository } from './domain/PodcastEpisode/interfaces/PodcastEpisodeRepository.interface';
import { ApiPodcastEpisodeRepository } from './infrastructure/PodcastEpisode/ApiPodcastepisodeRepository';
import { LocalStorageLastEpisodeRepository } from './infrastructure/PodcastEpisode/LocalStorageLastEpisodeRepository';

const repositories: Provider[] = [
  {
    provide: PodcastEpisodeRepository,
    useClass: ApiPodcastEpisodeRepository,
  },
  {
    provide: LastEpisodesRepository,
    useClass: LocalStorageLastEpisodeRepository,
  },
];

export const providers: Provider[] = [...repositories];
