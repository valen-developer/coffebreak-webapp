import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordRecover } from 'src/app/application/Auth/PasswordRecover.service';
import { AlertService } from 'src/app/presentation/shared/modules/alert/alert.service';

@Component({
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss'],
})
export class RecoverPasswordComponent implements OnInit {
  public form: FormGroup;
  public emailControl: FormControl;
  public passwordControl: FormControl;
  public passwordConfirmationControl: FormControl;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alert: AlertService,
    private passwordRecover: PasswordRecover
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      passwordConfirmation: ['', [Validators.required]],
    });

    this.emailControl = this.form.get('email') as FormControl;
    this.passwordControl = this.form.get('password') as FormControl;
    this.passwordConfirmationControl = this.form.get(
      'passwordConfirmation'
    ) as FormControl;
  }

  ngOnInit(): void {}

  public async onSubmit(): Promise<void> {
    const isValid = this.form.valid;
    if (!isValid)
      return this.alert.warning({
        message: 'Formulario inválido',
        subtitle: 'Por favor, complete todos los campos requeridos',
      });

    const { email, password, passwordConfirmation } = this.form.value;

    this.passwordRecover
      .recoverPassword({
        email,
        password,
        passwordConfirmation,
      })
      .then(() => {
        this.alert.success({
          message: 'Usuario reactivado',
          subtitle: 'Revise su correo para confirmar su cuenta',
        });

        this.router.navigate(['/settings']);
      })
      .catch(() => {
        this.alert.danger({
          message: 'Error al reactivar usuario',
          subtitle: 'Por favor, intente nuevamente',
        });
      });
  }
}
