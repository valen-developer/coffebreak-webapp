import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-timer-progress-circle',
  templateUrl: './timer-progress-circle.component.html',
  styleUrls: ['./timer-progress-circle.component.scss'],
})
export class TimerProgressCircleComponent implements OnInit, OnDestroy {
  @Input() percent$: Observable<number> = of(0);
  @Input() timeToEnd$: Observable<number> = of(0);

  public percent = 0;
  public timeToEnd = 0;

  private percentSubscription!: Subscription;
  private timeToEndSubscription!: Subscription;

  constructor() {}

  ngOnInit(): void {
    this.percentSubscription = this.percent$.subscribe((percent) => {
      this.percent = percent;
    });

    this.timeToEndSubscription = this.timeToEnd$.subscribe((timeToEnd) => {
      this.timeToEnd = timeToEnd;
    });
  }

  ngOnDestroy(): void {
    this.percentSubscription?.unsubscribe();
    this.timeToEndSubscription?.unsubscribe();
  }

  degress(): number {
    const degress = 360 * this.percent;
    return degress;
  }

  // true if degress is between 0 and 180
  clip(): boolean {
    const degress = this.degress();
    return degress > 0 && degress < 180;
  }

  secondsToString(seconds: number | null): string {
    if (!seconds) return '00:00';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secondsLeft = Math.floor(seconds % 60);

    const fixedHour = hours < 10 ? `0${hours}` : hours;
    const fixedMinute = minutes < 10 ? `0${minutes}` : minutes;
    const fixedSecond = secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft;

    return `${fixedHour}:${fixedMinute}:${fixedSecond}`;
  }
}
