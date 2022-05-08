import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PodcastEpisode } from 'src/app/domain/PodcastEpisode/PodcastEpisode.model';
import { Nullable } from 'src/app/domain/Shared/types/Nullable.type';
import { AudioController } from './audio-controller.service';

@Injectable({
  providedIn: 'root',
})
export class EpisodePlayerService {
  private _episodePlaying!: Nullable<PodcastEpisode>;

  private episodeSubject = new BehaviorSubject<Nullable<PodcastEpisode>>(null);
  public episode$ = this.episodeSubject.asObservable();

  constructor(private audioController: AudioController) {}

  public setEpisode(episode: PodcastEpisode): void {
    const isSame = this._episodePlaying?.uuid.value === episode?.uuid.value;

    if (isSame) return;

    if (!episode.audioUrl.value) throw new Error('Episode has no audio url');

    this._episodePlaying = episode;
    this.episodeSubject.next(episode);
    this.audioController.setupAudio(episode?.audioUrl.value as string);
  }
}
