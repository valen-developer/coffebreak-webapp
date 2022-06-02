import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthStatusService } from 'src/app/application/Auth/AuthStatus.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})
export class LibraryComponent implements OnInit {
  public isAuthenticated$: Observable<boolean>;

  constructor(private authStatus: AuthStatusService) {
    this.isAuthenticated$ = this.authStatus.isAuthenticated$;
  }

  ngOnInit(): void {}
}
