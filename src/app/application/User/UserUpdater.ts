import { Injectable } from '@angular/core';
import { UserRepository } from 'src/app/domain/User/interfaces/UserRepository.interface';
import { User } from 'src/app/domain/User/User.mode';

@Injectable({
  providedIn: 'root',
})
export class UserUpdater {
  constructor(private userRepository: UserRepository) {}

  public async update(user: User, image?: File): Promise<User> {
    return this.userRepository.update(user, image);
  }
}
