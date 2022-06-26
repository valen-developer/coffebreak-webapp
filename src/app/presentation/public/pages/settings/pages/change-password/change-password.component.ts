import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PasswordChanger } from 'src/app/application/Auth/PasswordChanger.service';
import { AlertService } from 'src/app/presentation/shared/modules/alert/alert.service';

@Component({
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  public form!: FormGroup;
  public passwordControl: FormControl;
  public confirmationControl: FormControl;

  constructor(
    private fb: FormBuilder,
    private alert: AlertService,
    private passwordChanger: PasswordChanger
  ) {
    this.form = this.fb.group({
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ],
      ],
      passwordConfirmation: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ],
      ],
    });

    this.passwordControl = this.form.get('password') as FormControl;
    this.confirmationControl = this.form.get(
      'passwordConfirmation'
    ) as FormControl;
  }

  ngOnInit(): void {}

  public onSubmit(): void {
    const isValid = this.form.valid;
    if (!isValid) return this.showMessage();

    const isSame = this.checkIfMatch();
    if (!isSame) return;

    const { password, passwordConfirmation } = this.form.value;

    this.passwordChanger
      .changePassword(password, passwordConfirmation)
      .then(() => {
        this.alert.success('Contraseña cambiada con éxito');
        this.form.reset();
      })
      .catch((e) =>
        this.alert.danger(e?.message ?? 'Error al cambiar contraseña')
      );
  }

  private checkIfMatch(): boolean {
    const { password, passwordConfirmation } = this.form.value;
    const isSame = password === passwordConfirmation;

    if (!isSame) this.showMessage('Las contraseñas no coinciden');

    return isSame;
  }

  private showMessage(message?: string): void {
    const showedMessage =
      message ??
      'La contraseña debe tener al menos 8 caracteres, minúsculas, mayúsculas y números';

    this.alert.warning(showedMessage);
  }
}
