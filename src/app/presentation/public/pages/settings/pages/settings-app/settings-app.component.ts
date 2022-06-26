import { Component, OnInit, ViewChild } from '@angular/core';
import { TimerSettingsModalComponent } from 'src/app/presentation/shared/components/timer-settings-modal/timer-settings-modal.component';
import { ModalComponent } from 'src/app/presentation/shared/modules/modal/modal.component';

@Component({
  templateUrl: './settings-app.component.html',
  styleUrls: ['./settings-app.component.scss'],
})
export class SettingsAppComponent implements OnInit {
  @ViewChild('modal', { static: true }) modal!: ModalComponent;

  constructor() {}

  ngOnInit(): void {}

  public onClickSetTimer(): void {
    if (!this.modal) return;

    this.modal
      .show(TimerSettingsModalComponent, {})
      .then(() => this.modal.hide());
  }
}
