import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserValidator } from 'src/app/application/Auth/ValidateUser.service';
import { Nullable } from 'src/app/domain/Shared/types/Nullable.type';
import { AlertService } from 'src/app/presentation/shared/modules/alert/alert.service';
import { StorageService } from 'src/app/presentation/shared/services/storage.service';

@Component({
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.scss'],
})
export class ValidateComponent implements OnInit {
  private readonly errorMessage =
    'Realice el registro de nuevo o acceda a recuperar contraseña';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userValidator: UserValidator,
    private storage: StorageService,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    const token = this.getToken();
    if (!token) {
      this.alert.danger({
        message: 'No se ha podido validar el usuario',
        subtitle: this.errorMessage,
      });

      this.router.navigate(['/auth/register']);
      return;
    }

    this.deleteToken();
    this.validate(token);
  }

  private getToken(): Nullable<string> {
    return this.route.snapshot.queryParamMap.get('token');
  }

  private deleteToken(): void {
    this.storage.remove('token');
  }

  private validate(token: string): void {
    this.userValidator
      .validate(token)
      .then(() => {
        this.alert.success({
          message: 'Usuario validado',
          subtitle: 'Puede iniciar sesión',
        });
        this.router.navigate(['/settings']);
      })
      .catch(() => {
        this.alert.danger({
          message: 'No se ha podido validar el usuario',
          subtitle: this.errorMessage,
        });
        this.router.navigate(['/auth/register']);
      });
  }
}
