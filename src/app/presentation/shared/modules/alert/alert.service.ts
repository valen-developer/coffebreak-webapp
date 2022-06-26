import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UUIDGenerator } from 'src/app/domain/Shared/interfaces/UuidGenerator';
import { isNull } from 'src/app/helpers/isNull';
import { NotOptional } from 'src/app/helpers/NotOptional.type';
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

  public success(params: AlertShowParams): void {
    const fixedParams = this.paramsFixer(params);

    this.emitAlert({
      message: fixedParams.message,
      type: 'succes',
      autoclose: fixedParams.autoclose as boolean,
      subtitle: fixedParams.subtitle,
    });
  }

  public warning(params: AlertShowParams): void {
    const fixedParams = this.paramsFixer(params);

    this.emitAlert({
      message: fixedParams.message,
      type: 'warning',
      autoclose: fixedParams.autoclose as boolean,
      subtitle: fixedParams.subtitle,
    });
  }

  public danger(params: AlertShowParams): void {
    const fixedParams = this.paramsFixer(params);

    this.emitAlert({
      message: fixedParams.message,
      type: 'danger',
      autoclose: fixedParams.autoclose as boolean,
      subtitle: fixedParams.subtitle,
    });
  }

  public info(params: AlertShowParams): void {
    const fixedParams = this.paramsFixer(params);

    this.emitAlert({
      message: fixedParams.message,
      type: 'info',
      autoclose: fixedParams.autoclose as boolean,
      subtitle: fixedParams.subtitle,
    });
  }

  private emitAlert(params: AlertTypeParams): void {
    this.alertSubject.next({
      uuid: this.uuidGenerator.generate(),
      message: params.message,
      subtitle: params.subtitle,
      type: params.type,
      autoClose: params.autoclose,
    });
  }

  private paramsFixer(params: AlertShowParams): NotOptional<AlertShowParams> {
    const fixedParams: NotOptional<AlertShowParams> = {
      message: params.message,
      subtitle: params.subtitle ?? params.message,
      autoclose: isNull(params.autoclose) ? true : params.autoclose,
    };
    return fixedParams;
  }
}

interface AlertShowParams {
  message: string;
  subtitle?: string;
  autoclose?: boolean;
}

interface AlertTypeParams extends NotOptional<AlertShowParams> {
  type: alertTypes;
  autoclose: boolean;
}
