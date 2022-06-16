import { Component } from '@angular/core';
import { UserLogger } from './application/Auth/UserLogger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'webapp';

  constructor(private userLogger: UserLogger) {
    this.tryLogin();
  }

  private tryLogin(): void {
    this.userLogger.loginWithToken().catch(() => {});
  }
}
