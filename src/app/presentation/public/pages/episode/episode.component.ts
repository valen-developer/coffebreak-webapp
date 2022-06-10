import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { PlaylistEpisodeUpdater } from 'src/app/application/Playlist/PlaylistEpisodeUpdater';
import { PodcastEpisodeFinder } from 'src/app/application/PodcastEpisode/PodcastEpisodeFinder';
import { Playlist } from 'src/app/domain/Playlist/Playlist.model';
import { PodcastEpisode } from 'src/app/domain/PodcastEpisode/PodcastEpisode.model';
import { PodcastEpisodeQuery } from 'src/app/domain/PodcastEpisode/PodcastEpisodeQuery';
import { AlertService } from 'src/app/presentation/shared/modules/alert/alert.service';
import { EpisodePlayerService } from 'src/app/presentation/shared/modules/audio-player/services/episode-player.service';
import { NavbarAudioController } from 'src/app/presentation/shared/modules/audio-player/services/navbar-audio-controller.service';
import { PlaylistPlayerService } from 'src/app/presentation/shared/modules/audio-player/services/playlist-player.service';
import { ModalComponent } from 'src/app/presentation/shared/modules/modal/modal.component';
import { RouteToolService } from 'src/app/presentation/shared/services/route-tool.service';
import { PlaylistSelectorModalComponent } from '../../components/playlist-selector-modal/playlist-selector-modal.component';

@Component({
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.scss'],
})
export class EpisodeComponent implements OnInit, OnDestroy {
  @ViewChild('modal', { static: true }) modal!: ModalComponent;

  public episode!: PodcastEpisode;
  private episodePlaying!: PodcastEpisode;
  public playlist!: Playlist;
  public isSameThanPlaying = false;

  public episodePlaylistIndex$: Observable<number>;
  public previousUrl$!: Observable<string>;

  private episodePlayingSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private navbarAudioController: NavbarAudioController,
    private episodePlayerService: EpisodePlayerService,
    private playlistPlayer: PlaylistPlayerService,
    private routeTool: RouteToolService,
    private episodeFinder: PodcastEpisodeFinder,
    private playlistEpisodeUpdater: PlaylistEpisodeUpdater,
    private alert: AlertService
  ) {
    this.episodePlaylistIndex$ = this.playlistPlayer.episodeIndex$;
    this.previousUrl$ = this.routeTool.previousUrl$;
  }

  ngOnInit(): void {
    this.navbarAudioController.hide();

    const query: PodcastEpisodeQuery = {
      uuid_equals: this.getUuid(),
    };

    this.episodeFinder.filter(query, {}).then((episodeArray) => {
      const episode = episodeArray[0];
      this.episode = episode;
      this.isSameThanPlaying = this.episode?.isSame(this.episodePlaying);
    });

    this.episodePlayingSubscription =
      this.episodePlayerService.episode$.subscribe({
        next: (episode) => {
          if (!episode) return;
          this.episodePlaying = episode;
          this.isSameThanPlaying = this.episode?.isSame(episode);
        },
      });
  }

  ngOnDestroy(): void {
    this.navbarAudioController.show();
    this.episodePlayingSubscription?.unsubscribe();
  }

  private getUuid(): string {
    return this.route.snapshot.paramMap.get('uuid') as string;
  }

  public isPlaylist(): boolean {
    this.playlist = this.playlistPlayer.getPlaylist();

    return this.episodePlayerService.isPlaylist();
  }

  public onNext(): void {
    if (!this.isPlaylist()) return;

    this.playlistPlayer.nextEpisode();

    this.episode = this.playlistPlayer.getSelectedEpisode();
  }

  public onPrevious(): void {
    if (!this.isPlaylist()) return;

    this.playlistPlayer.previousEpisode();

    this.episode = this.playlistPlayer.getSelectedEpisode();
  }

  public onAddToPlaylist(): void {
    if (!this.modal) return;

    this.modal.show(PlaylistSelectorModalComponent, {}).then((playlist) => {
      if (!playlist) return this.modal.hide();

      this.playlistEpisodeUpdater
        .addEpisode(playlist, this.episode)
        .then(() => {
          this.alert.success(
            `Episodio ${this.episode.episode} añadido a la lista ${playlist.name.value}`
          );
        });
    });
  }

  public onImageError(event: ErrorEvent): void {
    const imageHtmlElement = event.target as HTMLImageElement;
    imageHtmlElement.src = 'https://via.placeholder.com/150';
  }

  public onPlayPulse(): void {
    this.episodePlayerService.setEpisode(this.episode);
  }
}
