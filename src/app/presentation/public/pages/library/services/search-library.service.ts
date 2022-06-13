import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Nullable } from 'src/app/domain/Shared/types/Nullable.type';

@Injectable({
  providedIn: 'root',
})
export class SearchLibraryService {
  private _search: Nullable<string>;

  private searchSubject: BehaviorSubject<Nullable<string>>;
  public search$: Observable<Nullable<string>>;

  constructor() {
    this.searchSubject = new BehaviorSubject<Nullable<string>>(null);
    this.search$ = this.searchSubject.asObservable();
  }

  public setSearch(search: Nullable<string>): void {
    this._search = search;
    this.searchSubject.next(search);
  }
}
