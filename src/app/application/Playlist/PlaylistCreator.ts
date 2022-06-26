import { Injectable } from '@angular/core';
import { PlaylistRepository } from 'src/app/domain/Playlist/interfaces/PlaylistRepository.interface';
import { Playlist } from 'src/app/domain/Playlist/Playlist.model';
import { UUIDGenerator } from 'src/app/domain/Shared/interfaces/UuidGenerator';
import { ImageSizeGuard } from '../Shared/decorators/ImageSizeGuard';

@Injectable({
  providedIn: 'root',
})
export class PlaylistCreator {
  constructor(
    private playlistRepository: PlaylistRepository,
    private uuidGenerator: UUIDGenerator
  ) {}

  @ImageSizeGuard()
  public async createPlaylist(params: CreateParams): Promise<Playlist> {
    if (!params.image) throw new Error('Una imagen es necesaria.');

    const playlist = new Playlist({
      uuid: this.uuidGenerator.generate(),
      name: params.name,
      own: params.own,
      description: params.description,
    });

    return await this.playlistRepository.save(playlist, params.image);
  }

  public async duplicatePlaylist(playlist: Playlist): Promise<Playlist> {
    return await this.playlistRepository.duplicate(playlist.uuid.value);
  }
}

interface CreateParams {
  name: string;
  description: string;
  own: string;
  image: File;
}
