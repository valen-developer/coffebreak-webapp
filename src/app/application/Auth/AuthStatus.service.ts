import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Nullable } from 'src/app/domain/Shared/types/Nullable.type';
import { User } from 'src/app/domain/User/User.mode';

@Injectable({
  providedIn: 'root',
})
export class AuthStatusService {
  private _user!: Nullable<User>;
  private _isAuthenticated: boolean = false;

  private userSubject: BehaviorSubject<Nullable<User>>;
  public user$: Observable<Nullable<User>>;

  private isAuthenticatedSubject: BehaviorSubject<boolean>;
  public isAuthenticated$: Observable<boolean>;

  constructor() {
    this.userSubject = new BehaviorSubject<Nullable<User>>(null);
    this.user$ = this.userSubject.asObservable();

    this.isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    this.isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  }

  public setUser(user: User): void {
    this._user = user;
    this._isAuthenticated = user ? true : false;
    this.emitUser();
    this.emitIsAuthenticated();
  }

  public getUser(): Nullable<User> {
    return this._user;
  }

  public logout(): void {
    this._user = null;
    this._isAuthenticated = false;
    this.emitUser();
    this.emitIsAuthenticated();
  }

  private emitUser(): void {
    this.userSubject.next(this._user);
  }

  private emitIsAuthenticated(): void {
    this.isAuthenticatedSubject.next(this._isAuthenticated);
  }
}
