import { Nullable } from '../../Shared/types/Nullable.type';

export abstract class LastEpisodesRepository {
  abstract getLastEar(): Promise<Nullable<LastEpisodeEar>>;
  abstract getAllEar(): Promise<LastEpisodeEar[]>;

  abstract setLastEar(lastEar: LastEpisodeEar): Promise<void>;
  abstract addEar(ear: LastEpisodeEar): Promise<void>;
}

export interface LastEpisodeEar {
  uuid: string;
  time: string;
}
