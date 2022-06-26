import { Injectable } from '@angular/core';
import { AuthRepository } from 'src/app/domain/Auth/interfaces/AuthRepository';

@Injectable({
  providedIn: 'root',
})
export class PasswordChanger {
  constructor(private authRepository: AuthRepository) {}

  public async changePassword(
    password: string,
    passwordConfirmation: string
  ): Promise<void> {
    this.checkPassword(password, passwordConfirmation);

    await this.authRepository.changePassword(password, passwordConfirmation);
  }

  private checkPassword(password: string, passwordConfirmation: string): void {
    const isMatch = password === passwordConfirmation;

    if (!isMatch) {
      throw new Error('Las contraseñas no coinciden');
    }
  }
}
