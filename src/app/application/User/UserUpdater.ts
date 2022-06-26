import { Injectable } from '@angular/core';
import { UserRepository } from 'src/app/domain/User/interfaces/UserRepository.interface';
import { User } from 'src/app/domain/User/User.mode';
import { AuthStatusService } from '../Auth/AuthStatus.service';
import { ImageSizeGuard } from '../Shared/decorators/ImageSizeGuard';

@Injectable({
  providedIn: 'root',
})
export class UserUpdater {
  constructor(
    private userRepository: UserRepository,
    private authStatus: AuthStatusService
  ) {}

  @ImageSizeGuard()
  public async update(params: UpdateUserParams): Promise<User> {
    const { user, image } = params;

    const updatedUser = await this.userRepository.update(user, image);
    this.authStatus.setUser(updatedUser);

    return updatedUser;
  }
}

export interface UpdateUserParams {
  user: User;
  image?: File;
}
