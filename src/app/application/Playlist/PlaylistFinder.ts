import { Injectable } from '@angular/core';
import { PlaylistRepository } from 'src/app/domain/Playlist/interfaces/PlaylistRepository.interface';
import { Playlist } from 'src/app/domain/Playlist/Playlist.model';
import { PlaylistQuery } from 'src/app/domain/Playlist/PlaylistQuery';
import { PodcastEpisode } from 'src/app/domain/PodcastEpisode/PodcastEpisode.model';

@Injectable({
  providedIn: 'root',
})
export class PlaylistFinder {
  constructor(private playlistRepository: PlaylistRepository) {}

  public async getPlaylist(uuid: string): Promise<Playlist> {
    return this.playlistRepository.getPlaylist(uuid);
  }

  public async getChannels(): Promise<Playlist[]> {
    return this.playlistRepository.getChannels();
  }

  public async getEpisodes(playlist: string): Promise<PodcastEpisode[]> {
    return this.playlistRepository.getEpisodes(playlist);
  }

  public async getPlayListByOwner(ownerUuid: string): Promise<Playlist[]> {
    return this.playlistRepository.getPlaylistByOwn(ownerUuid);
  }

  public async filter(query: PlaylistQuery): Promise<Playlist[]> {
    return this.playlistRepository.searchPlaylist(query);
  }
}
