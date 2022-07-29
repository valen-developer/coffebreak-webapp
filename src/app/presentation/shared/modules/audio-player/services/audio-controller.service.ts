import { Injectable, OnDestroy } from '@angular/core';
import {
  BehaviorSubject,
  debounceTime,
  fromEvent,
  map,
  Observable,
  Subject,
  Subscription,
  throttleTime,
} from 'rxjs';
import { DOMService } from '../../../services/dom.service';

@Injectable({
  providedIn: 'root',
})
export class AudioController implements OnDestroy {
  private _DEFAULT_VOLUME: number = 0.8;
  private _SHIFT_TIME: number = 5;

  private audioObject!: HTMLAudioElement;

  private playingStatusSubject: BehaviorSubject<boolean>;
  public playingStatus$: Observable<boolean>;

  private currentTimeSubject: BehaviorSubject<number>;
  public currentTime$!: Observable<number>;

  private volumeSubject: BehaviorSubject<number>;
  public volume$!: Observable<number>;

  private endEpisodeSubject: Subject<boolean>;
  public endEpisode$!: Observable<boolean>;

  private currentTimeSubscription!: Subscription;
  private endEpisodeSubscription!: Subscription;

  constructor(private domService: DOMService) {
    this.playingStatusSubject = new BehaviorSubject<boolean>(false);
    this.playingStatus$ = this.playingStatusSubject.asObservable();

    this.volumeSubject = new BehaviorSubject<number>(this._DEFAULT_VOLUME);
    this.volume$ = this.volumeSubject.asObservable();

    this.currentTimeSubject = new BehaviorSubject<number>(0);
    this.currentTime$ = this.currentTimeSubject.asObservable();

    this.endEpisodeSubject = new Subject<boolean>();
    this.endEpisode$ = this.endEpisodeSubject.asObservable();

    this.buildController();
  }

  private buildController(): void {
    if (!this.domService.isBrowser()) return;

    this.audioObject = new Audio();

    this.configCurrentTimeEmitter();
    this.configEndEpisodeEmitter();

    this.audioObject.onplay = () => {
      this.emitPlayingStatus(true);
    };

    this.audioObject.onpause = () => {
      this.emitPlayingStatus(false);
    };
  }

  ngOnDestroy(): void {
    this.currentTimeSubscription?.unsubscribe();
    this.endEpisodeSubscription?.unsubscribe();
  }

  public setupAudio(url: string): void {
    this.audioObject.src = url;
    this.emitPlayingStatus(!this.audioObject.paused);
    this.emitCurrentTime(this.audioObject.currentTime);
    this.emitVolume(this.audioObject.volume);
  }

  public togglePlayPause(): void {
    const isPlaying = !this.audioObject.paused;

    if (isPlaying) this.pause();

    if (!isPlaying) this.play();
  }

  public play(): void {
    this.audioObject.play();
  }

  public pause(): void {
    this.audioObject.pause();
  }

  public setVolume(volume: number): void {
    const isValidValue = Math.abs(volume) <= 1;

    if (!isValidValue) return;

    this.audioObject.volume = volume;
    this.emitVolume(volume);
  }

  public setCurrentTime(time: number): void {
    this.audioObject.currentTime = time;
  }

  private emitPlayingStatus(status: boolean): void {
    this.playingStatusSubject.next(status);
  }

  public isPlaying(): boolean {
    return !this.audioObject.paused;
  }

  private configCurrentTimeEmitter(): void {
    this.currentTimeSubscription = fromEvent(this.audioObject, 'timeupdate')
      .pipe(
        throttleTime(900),
        map((event: any) => {
          const seconds = this.audioObject.currentTime;
          return Math.floor(seconds);
        })
      )
      .subscribe({
        next: (time) => this.emitCurrentTime(time),
      });
  }

  private configEndEpisodeEmitter(): void {
    this.endEpisodeSubscription = fromEvent(this.audioObject, 'ended')
      .pipe(debounceTime(200))
      .subscribe({
        next: () => {
          this.emitPlayingStatus(false);
          this.endEpisodeSubject.next(true);
        },
      });
  }

  private emitCurrentTime(time: number): void {
    this.currentTimeSubject.next(time);
  }

  private emitVolume(volume: number): void {
    this.volumeSubject.next(volume);
  }

  public shiftLeft(): void {
    this.shift(-this._SHIFT_TIME);
  }

  public shiftRight(): void {
    this.shift(this._SHIFT_TIME);
  }

  private shift(shiftTime: number): void {
    const currentTime = this.audioObject.currentTime;
    const newTime = currentTime + shiftTime;

    if (newTime > this.audioObject.duration) return;
    if (newTime < 0) return;

    this.audioObject.currentTime = newTime;
  }
}
