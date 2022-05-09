import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { LastEpisodesRepository } from 'src/app/domain/PodcastEpisode/interfaces/LastEpisodesRepository.interface';
import { PodcastEpisode } from 'src/app/domain/PodcastEpisode/PodcastEpisode.model';
import { Nullable } from 'src/app/domain/Shared/types/Nullable.type';
import { AudioController } from './audio-controller.service';

@Injectable()
export class EpisodePlayerService implements OnDestroy {
  private _episodePlaying!: Nullable<PodcastEpisode>;

  private episodeSubject = new BehaviorSubject<Nullable<PodcastEpisode>>(null);
  public episode$ = this.episodeSubject.asObservable();

  private timeSubscription!: Subscription;

  constructor(
    private audioController: AudioController,
    private lastEpisodeRepository: LastEpisodesRepository
  ) {
    this.subscribeToTime();
  }

  ngOnDestroy(): void {
    this.timeSubscription?.unsubscribe();
  }

  public setEpisode(episode: PodcastEpisode): void {
    const isSame = this._episodePlaying?.uuid.value === episode?.uuid.value;

    if (isSame) return;

    if (!episode?.audioUrl.value) throw new Error('Episode has no audio url');

    this._episodePlaying = episode;
    this.episodeSubject.next(episode);
    this.audioController.setupAudio(episode?.audioUrl.value as string);
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
