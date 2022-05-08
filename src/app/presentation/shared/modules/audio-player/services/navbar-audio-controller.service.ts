import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavbarAudioController {
  private _isShowing: boolean = false;

  private showSubject = new BehaviorSubject<boolean>(false);
  public show$ = this.showSubject.asObservable();

  constructor() {}

  get isShowing(): boolean {
    return this._isShowing;
  }

  public toggleShow(): void {
    this._isShowing = !this._isShowing;
    this.showSubject.next(this._isShowing);
  }

  public show(): void {
    this._isShowing = true;
    this.showSubject.next(this._isShowing);
  }

  public hide(): void {
    this._isShowing = false;
    this.showSubject.next(this._isShowing);
  }
}
