import { Injectable } from '@angular/core';
import {
  LastEpisodeEar,
  LastEpisodesRepository,
} from 'src/app/domain/PodcastEpisode/interfaces/LastEpisodesRepository.interface';
import { Nullable } from 'src/app/domain/Shared/types/Nullable.type';
import { StorageService } from 'src/app/presentation/shared/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageLastEpisodeRepository
  implements LastEpisodesRepository
{
  private _STORAGE_KEYS = {
    LAST_EPISODE_EAR: 'LAST_EPISODE_EAR',
    EPISODE_EARS: 'EPISODE_EARS',
  };

  constructor(private storageService: StorageService) {}

  async setLastEar(lastEar: LastEpisodeEar): Promise<void> {
    const string = JSON.stringify(lastEar);
    this.storageService.set(this._STORAGE_KEYS.LAST_EPISODE_EAR, string);
  }

  async addEar(ear: LastEpisodeEar): Promise<void> {
    const array = await this.getAllEar();
    array.push(ear);

    const string = JSON.stringify(array);

    this.storageService.set(this._STORAGE_KEYS.EPISODE_EARS, string);
  }

  async getLastEar(): Promise<Nullable<LastEpisodeEar>> {
    const string = this.storageService.get(this._STORAGE_KEYS.LAST_EPISODE_EAR);
    if (!string) return null;

    return JSON.parse(string);
  }

  async getAllEar(): Promise<LastEpisodeEar[]> {
    const string = this.storageService.get(this._STORAGE_KEYS.EPISODE_EARS);
    if (!string) return [];

    return JSON.parse(string);
  }
}
