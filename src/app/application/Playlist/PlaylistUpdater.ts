import { Injectable } from '@angular/core';
import { PlaylistRepository } from 'src/app/domain/Playlist/interfaces/PlaylistRepository.interface';
import { Playlist } from 'src/app/domain/Playlist/Playlist.model';
import { ImageSizeGuard } from '../Shared/decorators/ImageSizeGuard';

@Injectable({
  providedIn: 'root',
})
export class PlaylistUpdater {
  constructor(private playlistRepository: PlaylistRepository) {}

  @ImageSizeGuard()
  public async update(params: UpdateParams): Promise<void> {
    const { playlist, image } = params;

    await this.playlistRepository.update(playlist, image);
  }
}

interface UpdateParams {
  playlist: Playlist;
  image?: File;
}
