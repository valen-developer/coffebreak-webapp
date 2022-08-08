import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserLogger } from 'src/app/application/Auth/UserLogger.service';
import { AlertService } from 'src/app/presentation/shared/modules/alert/alert.service';

@Component({
  templateUrl: './rrss-success.component.html',
  styleUrls: ['./rrss-success.component.scss'],
})
export class RrssSuccessComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userLogger: UserLogger,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.loginWithToken();
  }

  private getToken(): string {
    return this.route.snapshot.queryParams['token'];
  }

  private loginWithToken(): void {
    this.userLogger
      .loginWithToken(this.getToken())
      .then(() => {
        this.alert.success({
          message: '¡Bienvenido!',
          subtitle: 'Inicio de sesión con Google correcto',
        });
      })
      .catch(() => {
        this.alert.danger({
          message: '¡Error!',
          subtitle: 'Inicio de sesión con Google incorrecto',
        });
      })
      .finally(() => {
        this.router.navigate(['/home']);
      });
  }
}
