import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UUIDGenerator } from 'src/app/domain/Shared/interfaces/UuidGenerator';
import { Alert, alertTypes } from './alert.model';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alertSubject: Subject<Alert>;
  public onAlert$: Observable<Alert>;

  constructor(private uuidGenerator: UUIDGenerator) {
    this.alertSubject = new Subject();
    this.onAlert$ = this.alertSubject.asObservable();
  }

  public success(message: string, autoClose = true): void {
    this.emitAlert(message, 'succes', autoClose);
  }

  public warning(message: string): void {
    this.emitAlert(message, 'warning');
  }

  public danger(message: string): void {
    this.emitAlert(message, 'danger');
  }

  public info(message: string, autoClose = true): void {
    this.emitAlert(message, 'info', autoClose);
  }

  private emitAlert(message: string, type: alertTypes, autoClose = true): void {
    this.alertSubject.next({
      uuid: this.uuidGenerator.generate(),
      message,
      type,
      autoClose,
    });
  }
}
