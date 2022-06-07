import { Injectable } from '@angular/core';
import { PlaylistRepository } from 'src/app/domain/Playlist/interfaces/PlaylistRepository.interface';
import { Playlist } from 'src/app/domain/Playlist/Playlist.model';
import { PodcastEpisode } from 'src/app/domain/PodcastEpisode/PodcastEpisode.model';

@Injectable({
  providedIn: 'root',
})
export class PlaylistEpisodeUpdater {
  constructor(private playlistRepository: PlaylistRepository) {}

  public async addEpisode(
    playlist: Playlist,
    episode: PodcastEpisode
  ): Promise<void> {
    await this.playlistRepository.addEpisode(playlist, episode);
  }

  public async removeEpisode(
    playlist: Playlist,
    episode: PodcastEpisode
  ): Promise<void> {
    await this.playlistRepository.removeEpisode(playlist, episode);
  }
}
