import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';
import { AuthRepository } from './domain/Auth/interfaces/AuthRepository';
import { PlaylistRepository } from './domain/Playlist/interfaces/PlaylistRepository.interface';
import { LastEpisodesRepository } from './domain/PodcastEpisode/interfaces/LastEpisodesRepository.interface';
import { PodcastEpisodeRepository } from './domain/PodcastEpisode/interfaces/PodcastEpisodeRepository.interface';
import { ImageRepository } from './domain/Shared/interfaces/ImageRepository.interface';
import { UUIDGenerator } from './domain/Shared/interfaces/UuidGenerator';
import { ApiAuthRepository } from './infrastructure/Auth/ApiAuthRepository';
import { ApiImageRepository } from './infrastructure/Image/ApiImageRepository';
import { ApiPlaylistRepository } from './infrastructure/Playlist/ApiPlaylistRepository';
import { ApiPodcastEpisodeRepository } from './infrastructure/PodcastEpisode/ApiPodcastepisodeRepository';
import { LocalStorageLastEpisodeRepository } from './infrastructure/PodcastEpisode/LocalStorageLastEpisodeRepository';
import { NanoidUuidGenerator } from './infrastructure/Shared/NanoidUuidGenerator';
import { AuthenticatedInterceptor } from './presentation/shared/interceptors/authenticated.interceptor';

const utils: Provider[] = [
  {
    provide: UUIDGenerator,
    useClass: NanoidUuidGenerator,
  },
];

const repositories: Provider[] = [
  {
    provide: PodcastEpisodeRepository,
    useClass: ApiPodcastEpisodeRepository,
  },
  {
    provide: LastEpisodesRepository,
    useClass: LocalStorageLastEpisodeRepository,
  },
  {
    provide: PlaylistRepository,
    useClass: ApiPlaylistRepository,
  },
  {
    provide: ImageRepository,
    useClass: ApiImageRepository,
  },
  {
    provide: AuthRepository,
    useClass: ApiAuthRepository,
  },
];

const interceptors: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthenticatedInterceptor,
    multi: true,
  },
];

export const providers: Provider[] = [
  ...utils,
  ...repositories,
  ...interceptors,
];
