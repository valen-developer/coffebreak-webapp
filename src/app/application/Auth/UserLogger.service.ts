import { Injectable } from '@angular/core';
import { AuthRepository } from 'src/app/domain/Auth/interfaces/AuthRepository';
import { UserEmail } from 'src/app/domain/User/valueObject/UserEmail.valueObject';
import { UserPassword } from 'src/app/domain/User/valueObject/UserPassword.valueObject';
import { StorageService } from 'src/app/presentation/shared/services/storage.service';
import { AuthStatusService } from './AuthStatus.service';

@Injectable({
  providedIn: 'root',
})
export class UserLogger {
  constructor(
    private authRepository: AuthRepository,
    private storageService: StorageService,
    private authStatusService: AuthStatusService
  ) {}

  public async login(email: string, password: string): Promise<void> {
    new UserEmail(email);
    this.checkPassword(password);

    const { user, token } = await this.authRepository.login(email, password);

    this.storageService.set('token', token);
    this.authStatusService.setUser(user);
  }

  private checkPassword(password: string): void {
    UserPassword.validate(password);
  }
}
