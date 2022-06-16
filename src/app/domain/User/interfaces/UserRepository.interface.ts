import { User } from '../User.mode';

export abstract class UserRepository {
  abstract update(user: User, image?: File): Promise<User>;
}
