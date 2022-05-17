import { Injectable } from '@angular/core';
import { PlaylistRepository } from 'src/app/domain/Playlist/interfaces/PlaylistRepository.interface';
import { Playlist } from 'src/app/domain/Playlist/Playlist.model';
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
}
