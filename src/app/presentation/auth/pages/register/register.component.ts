import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserRegister } from 'src/app/application/Auth/UserRegister.service';
import { AlertService } from 'src/app/presentation/shared/modules/alert/alert.service';
import { DOMService } from 'src/app/presentation/shared/services/dom.service';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  private readonly googleInitSigninUrl = environment.apiUrl + '/auth/google';

  public form: FormGroup;
  public nameControl: FormControl;
  public emailControl: FormControl;
  public passwordControl: FormControl;
  public passwordConfirmationControl: FormControl;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private domService: DOMService,
    private userRegister: UserRegister,
    private alert: AlertService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      passwordConfirmation: ['', [Validators.required]],
      name: ['', [Validators.required]],

      remember: [false],
    });

    this.nameControl = this.form.get('name') as FormControl;
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
        message: 'Formulario invalido',
        subtitle: 'Por favor, complete todos los campos requeridos',
      });

    const { email, password, passwordConfirmation, name } = this.form.value;
    this.userRegister
      .register({
        email,
        password,
        passwordConfirmation,
        name,
      })
      .then(() => {
        this.alert.success({
          message: 'Usuario registrado',
          subtitle: 'Revise su correo para confirmar su cuenta',
        });

        this.router.navigate(['/settings']);
      })
      .catch(() => {
        this.alert.danger({
          message: 'Error al registrar usuario',
          subtitle: 'Por favor, intente nuevamente',
        });
      });
  }

  public initWithGoogle(): void {
    const window = this.domService.getWindow();

    if (!window) return;

    window.location.href = this.googleInitSigninUrl;
  }
}
