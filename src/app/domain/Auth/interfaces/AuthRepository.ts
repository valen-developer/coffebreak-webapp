import { User } from '../../User/User.mode';

export abstract class AuthRepository {
  abstract signup(request: SignupRequest): Promise<void>;
  abstract login(email: string, password: string): Promise<LoginResponse>;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface SignupRequest {
  uuid: string;
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}
