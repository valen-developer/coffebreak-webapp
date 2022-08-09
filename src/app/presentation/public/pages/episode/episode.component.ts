import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { EpisodeTrackFinder } from 'src/app/application/EpisodeTrack/EpisodeTrackFinder';

import { PlaylistEpisodeUpdater } from 'src/app/application/Playlist/PlaylistEpisodeUpdater';
import { PodcastEpisodeFinder } from 'src/app/application/PodcastEpisode/PodcastEpisodeFinder';
import { EpisodeTrack } from 'src/app/domain/EpisodeTrack/EpisodeTrack.model';
import { Playlist } from 'src/app/domain/Playlist/Playlist.model';
import { PodcastEpisode } from 'src/app/domain/PodcastEpisode/PodcastEpisode.model';
import { PodcastEpisodeQuery } from 'src/app/domain/PodcastEpisode/PodcastEpisodeQuery';
import { Nullable } from 'src/app/domain/Shared/types/Nullable.type';
import { TimerSettingsModalComponent } from 'src/app/presentation/shared/components/timer-settings-modal/timer-settings-modal.component';
import { AlertService } from 'src/app/presentation/shared/modules/alert/alert.service';
import { AudioController } from 'src/app/presentation/shared/modules/audio-player/services/audio-controller.service';
import { EpisodePlayerService } from 'src/app/presentation/shared/modules/audio-player/services/episode-player.service';
import { NavbarAudioController } from 'src/app/presentation/shared/modules/audio-player/services/navbar-audio-controller.service';
import { PlayerTimerService } from 'src/app/presentation/shared/modules/audio-player/services/player-timer.service';
import { PlaylistPlayerService } from 'src/app/presentation/shared/modules/audio-player/services/playlist-player.service';
import { ModalComponent } from 'src/app/presentation/shared/modules/modal/modal.component';
import { DOMService } from 'src/app/presentation/shared/services/dom.service';
import { RouteToolService } from 'src/app/presentation/shared/services/route-tool.service';
import { PlaylistSelectorModalComponent } from '../../components/playlist-selector-modal/playlist-selector-modal.component';

type AVIABLE_TABS = 'DESCRIPTION' | 'EPISODE_TRACKS';

@Component({
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.scss'],
})
export class EpisodeComponent implements OnInit, OnDestroy {
  @ViewChild('modal', { static: true }) modal!: ModalComponent;

  public selectedTab: AVIABLE_TABS = 'DESCRIPTION';

  public episode!: Nullable<PodcastEpisode>;
  private episodePlaying!: PodcastEpisode;
  public playlist!: Nullable<Playlist>;
  public isSameThanPlaying = false;

  public tracks: EpisodeTrack[] = [];

  public episodePlaylistIndex$: Observable<number>;
  public previousUrl$!: Observable<string>;

  private episodePlayingSubscription!: Subscription;
  private keyupSubscription!: Subscription;

  public timerStatus$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private domService: DOMService,
    private audioController: AudioController,
    private navbarAudioController: NavbarAudioController,
    private episodePlayerService: EpisodePlayerService,
    private playlistPlayer: PlaylistPlayerService,
    private routeTool: RouteToolService,
    private episodeFinder: PodcastEpisodeFinder,
    private playlistEpisodeUpdater: PlaylistEpisodeUpdater,
    private trackFinder: EpisodeTrackFinder,
    private timer: PlayerTimerService,
    private alert: AlertService
  ) {
    this.episodePlaylistIndex$ = this.playlistPlayer.episodeIndex$;
    this.previousUrl$ = this.routeTool.previousUrl$;

    this.timerStatus$ = this.timer.timerUp$;
  }

  ngOnInit(): void {
    this.navbarAudioController.hide();

    const query: PodcastEpisodeQuery = {
      uuid_equals: this.getUuid(),
    };

    this.episodeFinder.filter(query, {}).then(({ episodes: episodeArray }) => {
      const episode = episodeArray[0];
      this.episode = episode;
      this.getEpisodeTracks();
      this.isSameThanPlaying = this.episode?.isSame(this.episodePlaying);
    });

    this.episodePlayingSubscription =
      this.episodePlayerService.episode$.subscribe({
        next: (episode) => {
          if (!episode) return;
          this.episodePlaying = episode;
          this.isSameThanPlaying = this.episode?.isSame(episode) ?? false;
        },
      });

    const document = this.domService.getDocument();
    if (!document) return;

    this.keyupSubscription?.unsubscribe();

    this.keyupSubscription = fromEvent(document, 'keyup').subscribe({
      next: (event: any) => {
        this.keypresManager(event);
      },
    });
  }

  ngOnDestroy(): void {
    this.navbarAudioController.show();
    this.episodePlayingSubscription?.unsubscribe();
    this.keyupSubscription?.unsubscribe();
  }

  private keypresManager(event: KeyboardEvent): void {
    const arrowLeft = event.key === 'ArrowLeft';
    const arrowRight = event.key === 'ArrowRight';
    const enter = event.key === 'Enter';

    const isValidKey = arrowLeft || arrowRight || enter;
    if (!isValidKey) return;

    const isSameThanPlaying = this.episode?.isSame(this.episodePlaying);
    if (!isSameThanPlaying) return;

    if (arrowLeft) {
      this.audioController.shiftLeft();
    }

    if (arrowRight) {
      this.audioController.shiftRight();
    }

    if (enter) {
      this.audioController.togglePlayPause();
    }
  }

  private getUuid(): string {
    return this.route.snapshot.paramMap.get('uuid') as string;
  }

  private getEpisodeTracks(): void {
    if (!this.episode) return;

    this.trackFinder.findByEpisode(this.episode?.uuid.value).then((tracks) => {
      this.tracks = tracks;
    });
  }

  public isPlaylist(): boolean {
    const playlist = this.playlistPlayer.getPlaylist();
    if (!playlist) return false;

    this.playlist = playlist;
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
      if (!this.episode) return this.modal.hide();

      this.playlistEpisodeUpdater
        .addEpisode(playlist, this.episode)
        .then(() => {
          this.alert.success({
            message: 'Episodio añadido',
            subtitle: `Episodio ${this.episode?.episode} añadido a la lista ${playlist.name.value}`,
          });
        });
    });
  }

  public onClickTimer(): void {
    this.modal
      .show(TimerSettingsModalComponent, {})
      .then(() => this.modal.hide());
  }

  public onImageError(event: ErrorEvent): void {
    const imageHtmlElement = event.target as HTMLImageElement;
    imageHtmlElement.src = 'assets/images/not-episode-image.png';
  }

  public onPlayPulse(): void {
    if (!this.episode) return;

    this.episodePlayerService.setEpisode(this.episode);
  }

  public setSelectedTab(tab: AVIABLE_TABS): void {
    this.selectedTab = tab;
  }

  public goToTrack(track: EpisodeTrack): void {
    if (!this.isSameThanPlaying)
      return this.alert.warning({
        message: 'No se navegar a ese momento',
        subtitle: 'No estás reproduciendo el mismo episodio',
      });

    const seconds = track.time.toSeconds();
    this.audioController.setCurrentTime(seconds);
  }
}
