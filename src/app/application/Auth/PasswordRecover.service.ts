import { Injectable } from '@angular/core';
import {
  AuthRepository,
  RecoverPasswordParams,
} from 'src/app/domain/Auth/interfaces/AuthRepository';

@Injectable({
  providedIn: 'root',
})
export class PasswordRecover {
  constructor(private authRepository: AuthRepository) {}

  async recoverPassword(params: RecoverPasswordParams): Promise<void> {
    await this.authRepository.recoverPassword(params);
  }
}
