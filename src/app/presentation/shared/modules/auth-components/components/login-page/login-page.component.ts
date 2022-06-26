import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserLogger } from 'src/app/application/Auth/UserLogger.service';
import { StorageService } from 'src/app/presentation/shared/services/storage.service';
import { AlertService } from '../../../alert/alert.service';

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

  @Output() authStatusEmitter = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private userLogger: UserLogger,
    private storageService: StorageService,
    private alert: AlertService
  ) {
    this.form = this.buildForm();

    this.emailControl = this.form.get('email') as FormControl;
    this.passwordControl = this.form.get('password') as FormControl;
    this.rememberControler = this.form.get('remember') as FormControl;

    this.getRemember();
  }

  ngOnInit(): void {}

  private buildForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [false],
    });
  }

  public async onSubmit(): Promise<void> {
    const { email, password } = this.form.value;

    this.setRemember();
    await this.userLogger
      .login(email, password)
      .then(() => this.authStatusEmitter.emit(true))
      .catch((error) => {
        this.alert.danger(error.message);
      });
  }

  private setRemember(): void {
    const { remember, email } = this.form.value;
    this.storageService.set('remember', remember);
    this.setEmail(email, remember);
  }

  private getRemember(): void {
    const remember = this.storageService.get('remember') === 'true';
    this.rememberControler.setValue(remember);

    if (remember) this.getEmail();
  }

  private setEmail(email: string, remember: boolean): void {
    if (!remember) return this.storageService.remove('email');

    this.storageService.set('email', email);
  }

  private getEmail(): void {
    const email = this.storageService.get('email');
    this.emailControl.setValue(email ?? '');
  }
}
