import { Injectable } from '@angular/core';
import { AuthRepository } from 'src/app/domain/Auth/interfaces/AuthRepository';

@Injectable({
  providedIn: 'root',
})
export class UserValidator {
  constructor(private authRepository: AuthRepository) {}

  public async validate(token: string): Promise<void> {
    await this.authRepository.validate(token);
  }
}
