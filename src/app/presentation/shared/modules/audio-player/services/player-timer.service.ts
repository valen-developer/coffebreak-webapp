import { Injectable, OnDestroy } from '@angular/core';
import { delay, Observable, of, Subscription } from 'rxjs';
import { AudioController } from './audio-controller.service';

@Injectable()
export class PlayerTimerService implements OnDestroy {
  private timer$!: Observable<null>;
  private timerSubscription!: Subscription;

  constructor(private audioController: AudioController) {}

  ngOnDestroy(): void {
    this.timerSubscription?.unsubscribe();
  }

  /**
   * Pauses the audio player
   * @param duration seconds
   */
  public setTimer(duration: number): void {
    this.timerSubscription?.unsubscribe();

    this.timer$ = this.makeTimerObservable(duration);

    this.timerSubscription = this.timer$.subscribe({
      next: () => this.pause(),
    });
  }

  private makeTimerObservable(duration: number): Observable<null> {
    return of(null).pipe(delay(duration * 1000));
  }

  private pause(): void {
    this.audioController.pause();
  }
}
