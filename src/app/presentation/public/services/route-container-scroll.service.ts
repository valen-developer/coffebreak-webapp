import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Nullable } from 'src/app/domain/Shared/types/Nullable.type';
import { RouteToolService } from '../../shared/services/route-tool.service';

@Injectable({
  providedIn: 'root',
})
export class RouteContainerScrollService {
  private _scrollDataHistories: ScrollDataHistory[] = [];

  private setScrollSubject: BehaviorSubject<number>;
  public setScroll$: Observable<number>;

  constructor(private routeTool: RouteToolService) {
    this.setScrollSubject = new BehaviorSubject<number>(0);
    this.setScroll$ = this.setScrollSubject.asObservable();
  }

  public setScrollData(scrollTop: number): void {
    const route = this.currentRoute();
    const data = this._scrollDataHistories.find((data) => data.route === route);

    if (!data) {
      this._scrollDataHistories.push({
        route,
        scrollTop,
      });
      return;
    }

    data.scrollTop = scrollTop;
  }

  public getScrollTop(route: string): Nullable<number> {
    const data = this._scrollDataHistories.find((data) => data.route === route);
    if (!data) return null;

    return data.scrollTop;
  }

  public scrollTo(scrollTop: number): void {
    this.setScrollSubject.next(scrollTop);
  }

  private currentRoute(): string {
    return this.routeTool.getcurrentUrl();
  }
}

interface ScrollDataHistory {
  route: string;
  scrollTop: number;
}
