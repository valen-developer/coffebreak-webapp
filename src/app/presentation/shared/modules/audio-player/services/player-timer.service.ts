import { Injectable, OnDestroy } from '@angular/core';
import {
  BehaviorSubject,
  delay,
  interval,
  Observable,
  of,
  Subscription,
  take,
} from 'rxjs';
import { StorageService } from '../../../services/storage.service';
import { AlertService } from '../../alert/alert.service';
import { AudioController } from './audio-controller.service';

@Injectable({
  providedIn: 'root',
})
export class PlayerTimerService implements OnDestroy {
  public duration: number = 0;

  public isTimerUp = false;
  private timerUpSubjet = new BehaviorSubject<boolean>(this.isTimerUp);
  public timerUp$: Observable<boolean> = this.timerUpSubjet.asObservable();

  private timer$!: Observable<null>;
  private timerSubscription!: Subscription;

  private intervalSubscription!: Subscription;

  private timeToEnd = 0;
  private timeToEndSubject = new BehaviorSubject<number>(0);
  public timeToEnd$: Observable<number> = this.timeToEndSubject.asObservable();

  public percentElapsed = 0;
  private percentElapsedSubject = new BehaviorSubject<number>(0);
  public percentElapsed$: Observable<number> =
    this.percentElapsedSubject.asObservable();

  constructor(
    private audioController: AudioController,
    private storage: StorageService,
    private alert: AlertService
  ) {}

  ngOnDestroy(): void {
    this.timerSubscription?.unsubscribe();
    this.intervalSubscription?.unsubscribe();
  }

  private clearObservables(): void {
    this.timerSubscription?.unsubscribe();
    this.intervalSubscription?.unsubscribe();
  }

  /**
   * Pauses the audio player
   * @param duration seconds
   */
  public setTimer(duration: number): void {
    this.cancelTimer();
    if (duration === 0) return;
    this.duration = duration;
    this.timerSubscription?.unsubscribe();

    this.timer$ = this.makeTimerObservable(duration);
    this.isTimerUp = true;
    this.timeToEnd = duration;
    this.emitTimerStatus();
    this.emitTimeToEnd();

    this.timerSubscription = this.timer$.subscribe({
      next: () => {
        this.isTimerUp = false;
        this.emitTimerStatus();
        this.pause();
        this.cancelTimer();
      },
    });

    this.intervalSubscription = this.makeIntervalObservable(duration).subscribe(
      {
        next: (seconds) => {
          this.timeToEnd = duration - seconds;
          this.percentElapsed = seconds / duration;
          this.emitTimeToEnd();
          this.emitPercentElapsed();
        },
      }
    );

    this.alert.success({
      message: 'Se ha iniciado el cronómetro',
      subtitle: `El audio se detendrá en ${this.timeToEndString()}`,
    });
  }

  public cancelTimer(): void {
    this.clearObservables();
    this.isTimerUp = false;
    this.emitTimerStatus();
    this.cleanStorage();
  }

  public timeToEndString(): string {
    const hours = Math.floor(this.timeToEnd / 3600);
    const minutes = Math.floor((this.timeToEnd - hours * 3600) / 60);
    const seconds = this.timeToEnd - hours * 3600 - minutes * 60;

    const hourFixed = hours < 10 ? `0${hours}` : hours;
    const minuteFixed = minutes < 10 ? `0${minutes}` : minutes;
    const secondFixed = seconds < 10 ? `0${seconds}` : seconds;

    const hourMessage = hours > 0 ? `${hourFixed} horas` : '';
    const minuteMessage = minutes > 0 ? `${minuteFixed} minutos` : '';
    const secondMessage = seconds > 0 ? `${secondFixed} segundos` : '';

    return `${hourMessage} ${minuteMessage} ${secondMessage}`;
  }

  private makeIntervalObservable(duration: number): Observable<number> {
    return interval(1000).pipe(take(duration));
  }

  /**
   * "It returns an observable that emits a null value after a specified number of seconds."
   * @param {number} duration - number - The duration of the timer in seconds.
   * @returns An observable that emits a null value after a delay of duration seconds.
   */
  private makeTimerObservable(duration: number): Observable<null> {
    return of(null).pipe(delay(duration * 1000));
  }

  private pause(): void {
    this.audioController.pause();

    this.alert.info({
      message: 'El tiempo se ha terminado',
      subtitle: 'El audio se ha detenido',
      autoclose: false,
    });
  }

  private emitTimerStatus(): void {
    this.timerUpSubjet.next(this.isTimerUp);
    this.saveTimerInStorage();
  }

  private emitTimeToEnd(): void {
    this.timeToEndSubject.next(this.timeToEnd);
    this.saveTimerInStorage();
  }

  private emitPercentElapsed(): void {
    this.percentElapsedSubject.next(this.percentElapsed);
  }

  private saveTimerInStorage(): void {
    const obj: { status: boolean; timeToEnd: number; percentElapsed: number } =
      {
        status: this.isTimerUp,
        timeToEnd: this.timeToEnd,
        percentElapsed: this.percentElapsed,
      };

    this.storage.set('timer', JSON.stringify(obj));
  }

  private cleanStorage(): void {
    this.storage.remove('timer');
  }
}
