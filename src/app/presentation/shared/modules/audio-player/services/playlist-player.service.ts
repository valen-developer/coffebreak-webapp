import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Playlist } from 'src/app/domain/Playlist/Playlist.model';
import { PodcastEpisode } from 'src/app/domain/PodcastEpisode/PodcastEpisode.model';
import { Nullable } from 'src/app/domain/Shared/types/Nullable.type';
import { AudioController } from './audio-controller.service';
import { EpisodePlayerService } from './episode-player.service';

@Injectable()
export class PlaylistPlayerService implements OnDestroy {
  private _playlist!: Nullable<Playlist>;
  private _episodes: PodcastEpisode[] = [];
  private _selectedEpisodeIndex: number = 0;

  private _endEpisodeSubscription!: Subscription;

  private episodePlayingIndexSubject: BehaviorSubject<number>;
  public episodeIndex$: Observable<number>;

  constructor(
    private audioController: AudioController,
    private episodePlayer: EpisodePlayerService
  ) {
    this.episodePlayingIndexSubject = new BehaviorSubject<number>(0);
    this.episodeIndex$ = this.episodePlayingIndexSubject.asObservable();

    this.subscribeToEndEpisode();
  }

  ngOnDestroy(): void {
    this._endEpisodeSubscription?.unsubscribe();
  }

  public setPlaylist(
    playlist: Playlist,
    episodes: PodcastEpisode[],
    op?: PlaylistOptions
  ): void {
    this._playlist = playlist;
    this._episodes = episodes;
    this._selectedEpisodeIndex = op?.selectedIndex ?? 0;

    const selectedEpisode = this._episodes[this._selectedEpisodeIndex];
    this.setEpisode(selectedEpisode, op);
  }

  public setNullPlaylist(): void {
    this._playlist = null;
    this._episodes = [];
    this._selectedEpisodeIndex = 0;
  }

  public getPlaylist(): Nullable<Playlist> {
    return this._playlist;
  }

  public getSelectedEpisode(): PodcastEpisode {
    return this._episodes[this._selectedEpisodeIndex];
  }

  public nextEpisode(): void {
    if (this.isLastEpisode()) return;

    this._selectedEpisodeIndex++;

    const selectedEpisode = this._episodes[this._selectedEpisodeIndex];
    this.setEpisode(selectedEpisode);
  }

  public previousEpisode(): void {
    if (this.isFirstEpisode()) return;

    this._selectedEpisodeIndex--;

    const selectedEpisode = this._episodes[this._selectedEpisodeIndex];
    this.setEpisode(selectedEpisode);
  }

  public isLastEpisode(): boolean {
    return this._selectedEpisodeIndex === this._episodes.length - 1;
  }

  public isFirstEpisode(): boolean {
    return this._selectedEpisodeIndex === 0;
  }

  private setEpisode(
    selectedEpisode: PodcastEpisode,
    op?: PlaylistOptions
  ): void {
    if (!selectedEpisode) return;

    this.episodePlayer.setEpisode(selectedEpisode, {
      autoplay: op?.autoplay ?? true,
      isPlaylist: true,
    });

    const episodeIndex = this._episodes.indexOf(selectedEpisode);
    this.episodePlayingIndexSubject.next(episodeIndex + 1);
  }

  private subscribeToEndEpisode(): void {
    this._endEpisodeSubscription = this.audioController.endEpisode$.subscribe({
      next: () => {
        this.nextEpisode();
      },
    });
  }
}

interface PlaylistOptions {
  autoplay?: boolean;
  random?: boolean;
  loop?: boolean;
  selectedIndex?: number;
}
