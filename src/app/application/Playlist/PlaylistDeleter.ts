import { Injectable } from '@angular/core';
import { PlaylistRepository } from 'src/app/domain/Playlist/interfaces/PlaylistRepository.interface';

@Injectable({
  providedIn: 'root',
})
export class PlaylistDeleter {
  constructor(private playlistRepository: PlaylistRepository) {}

  public async deletePlaylist(uuid: string): Promise<void> {
    await this.playlistRepository.delete(uuid);
  }
}
