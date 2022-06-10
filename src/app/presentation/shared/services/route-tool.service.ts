import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ScrollPositionService } from '../modules/scroll-position/scroll-position.service';
import { DOMService } from './dom.service';
import { ScrollService } from './scroll.service';

@Injectable({
  providedIn: 'root',
})
export class RouteToolService {
  private _previousUrl!: string;
  private _currentUrl!: string;

  private previusUrlSubject = new BehaviorSubject<string>('/home');
  public previousUrl$ = this.previusUrlSubject.asObservable();

  constructor(
    private domService: DOMService,
    private router: Router,
    private scrollPositionService: ScrollPositionService,
    private scrollService: ScrollService
  ) {
    this.setUp();
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

      this.previusUrlSubject.next(this._previousUrl);

      const scrollPosition = this.scrollPositionService.getScrollPosition(
        this._currentUrl
      );
      this.scrollService.scrollTo(scrollPosition);
    });
  }

  public getPreviousUrl(): string {
    return this._previousUrl;
  }

  public getcurrentUrl(): string {
    return this._currentUrl;
  }

  public redirectTo(url: string): void {
    this.router.navigateByUrl(url);
  }
}
