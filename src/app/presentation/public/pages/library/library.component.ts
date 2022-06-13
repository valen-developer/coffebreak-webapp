import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthStatusService } from 'src/app/application/Auth/AuthStatus.service';
import { Nullable } from 'src/app/domain/Shared/types/Nullable.type';
import { SearchLibraryService } from './services/search-library.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})
export class LibraryComponent implements OnInit {
  public isAuthenticated$: Observable<boolean>;

  constructor(
    private authStatus: AuthStatusService,
    private searchLibraryService: SearchLibraryService
  ) {
    this.isAuthenticated$ = this.authStatus.isAuthenticated$;
  }

  ngOnInit(): void {}

  public onSearch(search: Nullable<string>): void {
    this.searchLibraryService.setSearch(search);
  }
}
