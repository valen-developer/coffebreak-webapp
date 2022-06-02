import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthStatusService } from 'src/app/application/Auth/AuthStatus.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  public isAuthenticated$: Observable<boolean>;

  constructor(private authStatus: AuthStatusService) {
    this.isAuthenticated$ = this.authStatus.isAuthenticated$;
  }

  ngOnInit(): void {}
}
