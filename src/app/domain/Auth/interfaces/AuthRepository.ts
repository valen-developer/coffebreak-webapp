import { User } from '../../User/User.mode';

export abstract class AuthRepository {
  abstract signup(request: SignupRequest): Promise<void>;
  abstract login(email: string, password: string): Promise<LoginResponse>;
  abstract initGoogleAuth(): Promise<void>;
  abstract loginWithToken(): Promise<User>;
  abstract changePassword(
    password: string,
    passwordConfirmation: string
  ): Promise<void>;
  abstract recoverPassword(params: RecoverPasswordParams): Promise<void>;
}

export interface RecoverPasswordParams {
  email: string;
  password: string;
  passwordConfirmation: string;
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
