import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { PlayerTimerService } from '../../modules/audio-player/services/player-timer.service';
import { ModalComponent } from '../../modules/modal/modal.component';
import { TimerSettingsModalComponent } from '../timer-settings-modal/timer-settings-modal.component';

@Component({
  selector: 'app-timer-icon',
  templateUrl: './timer-icon.component.html',
  styleUrls: ['./timer-icon.component.scss'],
})
export class TimerIconComponent implements OnInit {
  @ViewChild('modal', { static: true }) modal!: ModalComponent;

  public timerStatus$: Observable<boolean>;

  constructor(private timer: PlayerTimerService) {
    this.timerStatus$ = this.timer.timerUp$;
  }

  ngOnInit(): void {}

  public onClick(): void {
    this.modal
      .show(TimerSettingsModalComponent, {})
      .then(() => this.modal.hide());
  }
}
