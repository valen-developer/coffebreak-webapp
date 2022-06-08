import { Injectable } from '@angular/core';
import { Playlist } from 'src/app/domain/Playlist/Playlist.model';

@Injectable({
  providedIn: 'root',
})
export class PlaylistHttpCache {
  private CACHE_DURATION_SECONDS = 120;

  private cache!: CacheObject;

  public setValue(value: Playlist[]): void {
    this.cache = {
      value,
      timestamp: Date.now(),
    };
  }

  public getCachedPlaylistArrayFromOwner(): Playlist[] {
    const hasCache = this.cache?.value && !this.isCacheExpired();
    if (!hasCache) throw new Error('No cached value');

    return this.cache.value;
  }

  public getCachedPlaylistFromOwner(uuid: string): Playlist {
    const hasCache = this.cache?.value && !this.isCacheExpired();
    if (!hasCache) throw new Error('No cached value');

    const playlist = this.cache.value.find(
      (playlist) => playlist.uuid.value === uuid
    );
    if (!playlist) throw new Error('No cached value');

    return playlist;
  }

  private isCacheExpired(): boolean {
    const isExpired =
      Date.now() - this.cache?.timestamp > this.CACHE_DURATION_SECONDS * 1000;

    return isExpired;
  }
}

interface CacheObject {
  timestamp: number;
  value: Playlist[];
}
