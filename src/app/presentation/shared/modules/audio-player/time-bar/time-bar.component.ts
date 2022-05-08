import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-time-bar',
  templateUrl: './time-bar.component.html',
  styleUrls: ['./time-bar.component.scss'],
})
export class TimeBarComponent implements OnInit {
  @Input() percent = 0;
  @Input() duration = 0;

  @Output() changeEmitter: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  get timeToString(): string {
    const time = this.duration * this.percent;

    return this.secondToString(time);
  }

  get durationToString(): string {
    return this.secondToString(this.duration);
  }

  private secondToString(timeInSeconds: number): string {
    const minutes = Math.floor(timeInSeconds / 60);
    const hours = Math.floor(minutes / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    const minuteFixed = minutes % 60;
    const hourFixed = hours % 24;

    const hourString = hourFixed < 10 ? `0${hourFixed}` : `${hourFixed}`;
    const minuteString =
      minuteFixed < 10 ? `0${minuteFixed}` : `${minuteFixed}`;
    const secondsString = seconds < 10 ? `0${seconds}` : seconds.toString();

    return `${hourString}:${minuteString}:${secondsString}`;
  }

  ngOnInit(): void {}

  public onChange(value: number): void {
    this.changeEmitter.emit(value);
  }
}
