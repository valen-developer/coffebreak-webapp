import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DOMService } from './dom.service';

@Injectable({
  providedIn: 'root',
})
export class RouteToolService {
  private _previousUrl!: string;
  private _currentUrl!: string;

  constructor(private domService: DOMService, private router: Router) {
    this.setUp();
    console.log('Instance');
  }

  private setUp(): void {
    if (!this.domService.isBrowser()) return;

    this._currentUrl = this.router.url;
    this._previousUrl = this._currentUrl;

    this.router.events.subscribe((event) => {
      const isNavigationEnd = event instanceof NavigationEnd;

      if (!isNavigationEnd) return;

      this._previousUrl = this._currentUrl;
      this._currentUrl = event.url;
    });
  }

  public getPreviousUrl(): string {
    return this._previousUrl;
  }
}
