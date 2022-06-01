import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthStatusService } from 'src/app/application/Auth/AuthStatus.service';
import { UserLogger } from 'src/app/application/Auth/UserLogger.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  public form: FormGroup;

  public emailControl: FormControl;
  public passwordControl: FormControl;
  public rememberControler: FormControl;

  constructor(
    private fb: FormBuilder,
    private userLogger: UserLogger,
    private authStatus: AuthStatusService
  ) {
    this.form = this.buildForm();

    this.emailControl = this.form.get('email') as FormControl;
    this.passwordControl = this.form.get('password') as FormControl;
    this.rememberControler = this.form.get('remember') as FormControl;

    this.authStatus.user$.subscribe({
      next: (user) => {
        console.log(user);
      },
    });
  }

  ngOnInit(): void {}

  private buildForm(): FormGroup {
    return this.fb.group({
      email: [''],
      password: [''],
      remember: [false],
    });
  }

  public onSubmit(): void {
    const { email, password } = this.form.value;

    this.userLogger.login(email, password).then(() => {
      console.log('Logado');
    });
  }
}
