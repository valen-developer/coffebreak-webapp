import { User } from '../User.mode';

export abstract class UserRepository {
  abstract update(user: User): Promise<User>;
}
