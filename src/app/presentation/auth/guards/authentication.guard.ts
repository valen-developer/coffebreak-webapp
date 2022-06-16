import { Injectable, OnDestroy } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthStatusService } from 'src/app/application/Auth/AuthStatus.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard
  implements CanActivate, CanActivateChild, OnDestroy
{
  private isAuth = false;
  private isAuthSubscription!: Subscription;

  constructor(private authStatus: AuthStatusService) {
    this.authStatus.isAuthenticated$.subscribe({
      next: (isAuth) => {
        this.isAuth = isAuth;
      },
    });
  }
  ngOnDestroy(): void {
    this.isAuthSubscription?.unsubscribe();
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.isAuth;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.isAuth;
  }
}
