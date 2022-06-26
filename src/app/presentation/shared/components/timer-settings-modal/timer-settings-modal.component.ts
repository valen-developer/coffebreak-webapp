import { Component, EventEmitter, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { PlayerTimerService } from '../../modules/audio-player/services/player-timer.service';
import { IModal } from '../../modules/modal/modal.interface';

@Component({
  selector: 'app-timer-settings-modal',
  templateUrl: './timer-settings-modal.component.html',
  styleUrls: ['./timer-settings-modal.component.scss'],
})
export class TimerSettingsModalComponent implements OnInit, IModal<any, any> {
  public initialState: any;
  public responseEmitter: EventEmitter<any> = new EventEmitter();
  public closeEmitter: EventEmitter<void> = new EventEmitter();

  public hours = new Array(24).fill(0).map((x, i) => i);

  public isTimerUp$: Observable<boolean> = of(false);
  public timeToEnd$: Observable<number> = of(0);
  public percentElapsed$: Observable<number> = of(0);

  public form: FormGroup;
  public hourControl: FormControl;
  public minutesControl: FormControl;
  public secondsControl: FormControl;

  constructor(private timer: PlayerTimerService, private fb: FormBuilder) {
    this.isTimerUp$ = timer.timerUp$;
    this.timeToEnd$ = timer.timeToEnd$;
    this.percentElapsed$ = timer.percentElapsed$;

    this.form = this.buildForm();

    this.hourControl = this.form.get('hours') as FormControl;
    this.minutesControl = this.form.get('minutes') as FormControl;
    this.secondsControl = this.form.get('seconds') as FormControl;
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      hours: [0, [Validators.min(0), Validators.max(60)]],
      minutes: [0, [Validators.min(0), Validators.max(60)]],
      seconds: [0, [Validators.min(0), Validators.max(60)]],
    });
  }

  onSubmit(): void {
    const isValid = this.form.valid;
    if (!isValid) return;

    const { hours, minutes, seconds } = this.form.value;
    const totalSeconds = hours * 60 * 60 + minutes * 60 + seconds;

    this.timer.setTimer(totalSeconds);

    this.hide();
  }

  onStop(): void {
    this.timer.cancelTimer();
  }

  hide(): void {
    this.closeEmitter.emit();
  }

  ngOnInit(): void {}
}
