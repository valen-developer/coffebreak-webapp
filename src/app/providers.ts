import { Provider } from '@angular/core';
import { PodcastEpisodeRepository } from './domain/PodcastEpisode/interfaces/PodcastEpisodeRepository.interface';
import { ApiPodcastEpisodeRepository } from './infrastructure/PodcastEpisode/ApiPodcastepisodeRepository';

const repositories: Provider[] = [
  {
    provide: PodcastEpisodeRepository,
    useClass: ApiPodcastEpisodeRepository,
  },
];

export const providers: Provider[] = [...repositories];
