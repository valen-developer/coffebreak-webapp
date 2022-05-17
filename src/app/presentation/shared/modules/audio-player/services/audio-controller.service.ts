import { Injectable, OnDestroy } from '@angular/core';
import {
  BehaviorSubject,
  fromEvent,
  map,
  Observable,
  throttleTime,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AudioController {
  private _DEFAULT_VOLUME: number = 0.8;

  private audioObject!: HTMLAudioElement;

  private playingStatusSubject: BehaviorSubject<boolean>;
  public playingStatus$: Observable<boolean>;

  private currentTimeSubject: BehaviorSubject<number>;
  public currentTime$!: Observable<number>;

  private volumeSubject: BehaviorSubject<number>;
  public volume$!: Observable<number>;

  constructor() {
    this.playingStatusSubject = new BehaviorSubject<boolean>(false);
    this.playingStatus$ = this.playingStatusSubject.asObservable();

    this.volumeSubject = new BehaviorSubject<number>(this._DEFAULT_VOLUME);
    this.volume$ = this.volumeSubject.asObservable();

    this.currentTimeSubject = new BehaviorSubject<number>(0);
    this.currentTime$ = this.currentTimeSubject.asObservable();

    this.audioObject = new Audio();

    this.configCurrentTimeEmitter();
  }

  public setupAudio(url: string): void {
    this.audioObject.src = url;
    this.emitPlayingStatus(!this.audioObject.paused);
    this.emitCurrentTime(this.audioObject.currentTime);
    this.emitVolume(this.audioObject.volume);
  }

  public togglePlayPause(): void {
    const isPlaying = !this.audioObject.paused;

    if (isPlaying) this.audioObject.pause();

    if (!isPlaying) this.audioObject.play();

    this.emitPlayingStatus(!isPlaying);
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
    const timeSubscription = fromEvent(this.audioObject, 'timeupdate')
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

  private emitCurrentTime(time: number): void {
    this.currentTimeSubject.next(time);
  }

  private emitVolume(volume: number): void {
    this.volumeSubject.next(volume);
  }
}
