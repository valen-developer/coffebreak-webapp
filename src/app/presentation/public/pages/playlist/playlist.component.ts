import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';
import { Observable } from 'rxjs';
import { AuthStatusService } from 'src/app/application/Auth/AuthStatus.service';
import { PlaylistCreator } from 'src/app/application/Playlist/PlaylistCreator';
import { PlaylistEpisodeUpdater } from 'src/app/application/Playlist/PlaylistEpisodeUpdater';
import { PlaylistFinder } from 'src/app/application/Playlist/PlaylistFinder';
import { ImageGetter } from 'src/app/application/Shared/ImageGetter';
import { Playlist } from 'src/app/domain/Playlist/Playlist.model';
import { PodcastEpisode } from 'src/app/domain/PodcastEpisode/PodcastEpisode.model';
import { PodcastDuration } from 'src/app/domain/PodcastEpisode/valueObjects/PodcastDuration.valueObject';
import { Nullable } from 'src/app/domain/Shared/types/Nullable.type';
import { DeleteModalComponent } from 'src/app/presentation/shared/components/delete-modal/delete-modal.component';
import { AlertService } from 'src/app/presentation/shared/modules/alert/alert.service';
import { EpisodePlayerService } from 'src/app/presentation/shared/modules/audio-player/services/episode-player.service';
import { PlaylistPlayerService } from 'src/app/presentation/shared/modules/audio-player/services/playlist-player.service';
import { ModalComponent } from 'src/app/presentation/shared/modules/modal/modal.component';
import { RouteToolService } from 'src/app/presentation/shared/services/route-tool.service';
import { ScrollService } from 'src/app/presentation/shared/services/scroll.service';

@Component({
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
})
export class PlaylistComponent implements OnInit {
  @ViewChild('modal', { static: true }) modal!: ModalComponent;

  public episodes: PodcastEpisode[] = [];
  public playlist!: Playlist;
  public canUpdate = false;

  public imageUrl!: string;
  public durationSeconds!: Nullable<PodcastDuration>;

  public isAuthenticated$: Observable<boolean>;

  public previousUrl = '/';

  constructor(
    private route: ActivatedRoute,
    private routeTool: RouteToolService,
    private scrollService: ScrollService,
    private authService: AuthStatusService,
    private playlistFinder: PlaylistFinder,
    private playlistCreator: PlaylistCreator,
    private playlistEpisodeUpdater: PlaylistEpisodeUpdater,
    private imageGetter: ImageGetter,
    private episodePlayer: EpisodePlayerService,
    private playlistPlayer: PlaylistPlayerService,

    private alert: AlertService
  ) {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
  }

  async ngOnInit(): Promise<void> {
    this.scrollService.scrollToTop();
    this.previousUrl = this.routeTool.getPreviousUrl();
    const uuid = this.getUuid();

    if (!uuid) {
      this.routeTool.redirectTo('/');
    }

    await this.getPlaylist(uuid);
    this.getImage(uuid);
    this.setCanUpdate();
  }

  public setCanUpdate(): void {
    const hasOwner = this.playlist?.getOwn()?.value ? true : false;
    this.canUpdate = hasOwner;
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

  public async removeEpisode(episode: PodcastEpisode): Promise<void> {
    const title = `el episodio ${episode.episode}`;
    const deleteConfirmation = await this.modal.show(DeleteModalComponent, {
      title,
    });

    if (!deleteConfirmation) return;

    this.playlistEpisodeUpdater
      .removeEpisode(this.playlist, episode)
      .then(() => {
        this.episodes = this.episodes.filter((ep) => ep.uuid !== episode.uuid);
        this.calculateDurationSeconds();
        this.alert.success({
          message: 'Episodio eliminado',
          subtitle: `El episodio ${episode.episode} ha sido eliminado`,
        });
      });
  }

  public async duplicate(): Promise<void> {
    this.playlistCreator
      .duplicatePlaylist(this.playlist)
      .then((duplicatedPlaylist: Playlist) => {
        this.alert.success({
          message: 'Lista duplicada',
          subtitle:
            'Puedes editarla desde la lista duplicada. Pulsa para ver tus listas',
          onClick: () => {
            const router = this.routeTool.getRouter();
            if (!router) return;

            router.navigate(['/library/playlist'], {
              state: {
                playlist: duplicatedPlaylist,
              },
            });
          },
        });
      })
      .catch(() => {
        this.alert.danger({
          message: 'Error al duplicar la lista',
          subtitle: 'No se pudo duplicar la lista',
        });
      });
  }
}
