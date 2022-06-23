import { Injectable } from '@angular/core';
import { UserRepository } from 'src/app/domain/User/interfaces/UserRepository.interface';
import { User } from 'src/app/domain/User/User.mode';
import { AuthStatusService } from '../Auth/AuthStatus.service';

@Injectable({
  providedIn: 'root',
})
export class UserUpdater {
  constructor(
    private userRepository: UserRepository,
    private authStatus: AuthStatusService
  ) {}

  public async update(user: User, image?: File): Promise<User> {
    const updatedUser = await this.userRepository.update(user, image);
    this.authStatus.setUser(updatedUser);

    return updatedUser;
  }
}
