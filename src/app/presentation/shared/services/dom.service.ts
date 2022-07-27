import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, InjectionToken, PLATFORM_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable, Subject } from 'rxjs';

import { Nullable } from 'src/app/domain/Shared/types/Nullable.type';

const MOBILE_WIDTH = 500;

@Injectable({
  providedIn: 'root',
})
export class DOMService {
  private onChangeViewSubject: Subject<void>;
  public onChangeViewDimension$: Observable<void>;

  constructor(
    @Inject(PLATFORM_ID) private platformID: InjectionToken<any>,
    @Inject(DOCUMENT) private document: Document,
    private title: Title
  ) {
    this.onChangeViewSubject = new Subject<void>();
    this.onChangeViewDimension$ = this.onChangeViewSubject.asObservable();

    this.observeChangeViewDimentions();
  }

  public isBrowser(): boolean {
    return isPlatformBrowser(this.platformID);
  }

  public isMobile(): boolean {
    if (!this.isBrowser()) return false;

    const width = this.getWindow()?.innerWidth ?? 0;

    return width < MOBILE_WIDTH;
  }

  public getDocument(): Nullable<Document> {
    return this.isBrowser() ? this.document : null;
  }

  public getWindow(): Nullable<Window> {
    return this.isBrowser() ? this.document.defaultView : null;
  }

  public getTitleObject(): Nullable<Title> {
    return this.title;
  }

  private observeChangeViewDimentions(): void {
    if (this.isBrowser()) {
      this.getWindow()?.addEventListener('resize', () => {
        this.onChangeViewDimentions();
      });
    }
  }

  private onChangeViewDimentions(): void {
    this.onChangeViewSubject.next();
  }
}
