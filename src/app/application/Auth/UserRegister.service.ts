import { Injectable } from '@angular/core';
import {
  AuthRepository,
  SignupRequest,
} from 'src/app/domain/Auth/interfaces/AuthRepository';
import { UUIDGenerator } from 'src/app/domain/Shared/interfaces/UuidGenerator';
import { UserEmail } from 'src/app/domain/User/valueObject/UserEmail.valueObject';
import { UserPassword } from 'src/app/domain/User/valueObject/UserPassword.valueObject';

@Injectable({
  providedIn: 'root',
})
export class UserRegister {
  constructor(
    private authRepository: AuthRepository,
    private uuidGenerator: UUIDGenerator
  ) {}

  public async register(params: Omit<SignupRequest, 'uuid'>): Promise<void> {
    new UserEmail(params.email);
    this.checkPassword(params.password, params.passwordConfirmation);

    await this.authRepository.signup({
      uuid: this.uuidGenerator.generate(),
      ...params,
    });
  }

  private checkPassword(password: string, passwordConfirmation: string): void {
    const isSame = password === passwordConfirmation;
    if (!isSame) throw new Error('Las contraseñas no coinciden');

    UserPassword.validate(password);
  }
}
