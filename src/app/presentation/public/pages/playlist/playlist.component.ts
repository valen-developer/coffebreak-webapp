import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlaylistFinder } from 'src/app/application/Playlist/PlaylistFinder';
import { ImageGetter } from 'src/app/application/Shared/ImageGetter';
import { Playlist } from 'src/app/domain/Playlist/Playlist.model';
import { PodcastEpisode } from 'src/app/domain/PodcastEpisode/PodcastEpisode.model';
import { PodcastDuration } from 'src/app/domain/PodcastEpisode/valueObjects/PodcastDuration.valueObject';
import { EpisodePlayerService } from 'src/app/presentation/shared/modules/audio-player/services/episode-player.service';
import { PlaylistPlayerService } from 'src/app/presentation/shared/modules/audio-player/services/playlist-player.service';
import { RouteToolService } from 'src/app/presentation/shared/services/route-tool.service';
import { ScrollService } from 'src/app/presentation/shared/services/scroll.service';

@Component({
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
})
export class PlaylistComponent implements OnInit {
  public episodes: PodcastEpisode[] = [];
  public playlist!: Playlist;

  public imageUrl!: string;
  public durationSeconds!: PodcastDuration;

  public previousUrl = '/';

  constructor(
    private route: ActivatedRoute,
    private routeTool: RouteToolService,
    private scrollService: ScrollService,
    private playlistFinder: PlaylistFinder,
    private imageGetter: ImageGetter,
    private episodePlayer: EpisodePlayerService,
    private playlistPlayer: PlaylistPlayerService
  ) {}

  ngOnInit(): void {
    this.scrollService.scrollToTop();
    this.previousUrl = this.routeTool.getPreviousUrl();
    const uuid = this.getUuid();

    if (!uuid) {
      this.routeTool.redirectTo('/');
    }

    this.getPlaylist(uuid);
    this.getImage(uuid);
  }

  private getUuid(): string {
    return this.route.snapshot.paramMap.get('uuid') ?? '';
  }

  private async getPlaylist(uuid: string): Promise<void> {
    const playlist = await this.playlistFinder.getPlaylist(uuid);
    const episodes = await this.playlistFinder.getEpisodes(uuid);

    this.playlist = playlist;
    this.episodes = episodes;

    this.calculateDurationSeconds();
  }

  private async getImage(uuid: string): Promise<void> {
    const image = await this.imageGetter.getDataUrlFromEntity(uuid);
    this.imageUrl = image;
  }

  private calculateDurationSeconds(): void {
    const seconds = this.episodes.reduce((acc, curr) => {
      return acc + curr.duration.value;
    }, 0);

    this.durationSeconds = new PodcastDuration(seconds);
  }

  public onPlay(episode: PodcastEpisode): void {
    const isEpisodeSelected = this.isEpisodeSelected(episode);

    if (isEpisodeSelected) return this.episodePlayer.togglePlayPause();

    const episodeIndex = this.episodes.indexOf(episode);
    this.playPlaylist(episodeIndex);
  }

  public playPlaylist(index = 0): void {
    this.playlistPlayer.setPlaylist(this.playlist, this.episodes, {
      autoplay: true,
      selectedIndex: index,
    });
  }

  public isEpisodePlaying(episode: PodcastEpisode): boolean {
    return this.episodePlayer.isEpisodePlaying(episode);
  }

  public isEpisodeSelected(episode: PodcastEpisode): boolean {
    return this.episodePlayer.isEpisodeSelected(episode);
  }
}
