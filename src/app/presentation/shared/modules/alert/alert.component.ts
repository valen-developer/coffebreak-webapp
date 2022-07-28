import { Component, OnInit } from '@angular/core';

import { Alert } from './alert.model';
import { AlertService } from './alert.service';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  private readonly _TIME_FOR_REMOVE_ALERT = 2250;

  public alerts: Alert[] = [];

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.alertService.onAlert$.subscribe((alert) => {
      this.processAlert(alert);
    });
  }

  private processAlert(alert: Alert): void {
    this.alerts.push(alert);
    if (!alert.autoClose) return;
    setTimeout(() => this.removeAlert(alert), this._TIME_FOR_REMOVE_ALERT);
  }

  public removeAlert(alert: Alert): void {
    alert.fadeOut = true;
    setTimeout(() => {
      this.alerts = this.alerts.filter((a) => a.uuid !== alert.uuid);
    }, 300);
  }

  public onClick(alert: Alert): void {
    if (!alert.onClick) return;

    alert.onClick();
    this.removeAlert(alert);
  }
}
