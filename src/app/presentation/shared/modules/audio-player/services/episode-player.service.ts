import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { LastEpisodesRepository } from 'src/app/domain/PodcastEpisode/interfaces/LastEpisodesRepository.interface';
import { PodcastEpisode } from 'src/app/domain/PodcastEpisode/PodcastEpisode.model';
import { Nullable } from 'src/app/domain/Shared/types/Nullable.type';
import { DOMService } from '../../../services/dom.service';
import { AudioController } from './audio-controller.service';

@Injectable()
export class EpisodePlayerService implements OnDestroy {
  private _episodePlaying!: Nullable<PodcastEpisode>;
  private _isPlaylist = false;

  private episodeSubject = new BehaviorSubject<Nullable<PodcastEpisode>>(null);
  public episode$ = this.episodeSubject.asObservable();

  private timeSubscription!: Subscription;

  constructor(
    private audioController: AudioController,
    private lastEpisodeRepository: LastEpisodesRepository,
    private domService: DOMService
  ) {
    this.subscribeToTime();
  }

  ngOnDestroy(): void {
    this.timeSubscription?.unsubscribe();
  }

  public setEpisode(episode: PodcastEpisode, opt?: SetEpisodeOptions): void {
    const isSame = this._episodePlaying?.uuid.value === episode?.uuid.value;

    if (isSame) return;

    if (!episode?.audioUrl.value) throw new Error('Episode has no audio url');

    this._isPlaylist = opt?.isPlaylist ?? false;
    this._episodePlaying = episode;
    this.episodeSubject.next(episode);
    this.audioController.setupAudio(episode?.audioUrl.value as string);

    if (opt?.autoplay) this.audioController.togglePlayPause();

    const title = this.domService.getTitleObject();

    if (!title) return;
    title.setTitle(episode?.title.value);
  }

  public togglePlayPause(): void {
    this.audioController.togglePlayPause();
  }

  public isEpisodePlaying(episode: PodcastEpisode): boolean {
    const isSameEpisode = this.isEpisodeSelected(episode);
    const isPlaying = this.audioController.isPlaying();

    return isSameEpisode && isPlaying;
  }

  public isEpisodeSelected(episode: PodcastEpisode): boolean {
    return this._episodePlaying?.uuid.value === episode.uuid.value;
  }

  public isPlaylist(): boolean {
    return this._isPlaylist;
  }

  private subscribeToTime(): void {
    this.timeSubscription = this.audioController.currentTime$.subscribe({
      next: (time) => {
        // si multiplo de 10
        const isTen = Math.floor(time) % 10 === 0;
        const isGreaterThan = time > 10;
        if (!isTen || !isGreaterThan || !this._episodePlaying) return;

        this.lastEpisodeRepository.setLastEar({
          uuid: this._episodePlaying.uuid.value,
          time: time.toString(),
        });
      },
    });
  }
}

interface SetEpisodeOptions {
  autoplay?: boolean;
  isPlaylist?: boolean;
}
