import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import {
  AuthRepository,
  LoginResponse,
  SignupRequest,
} from 'src/app/domain/Auth/interfaces/AuthRepository';
import { User, UserDto } from 'src/app/domain/User/User.mode';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiAuthRepository implements AuthRepository {
  private API_URL = environment.apiUrl + '/auth';
  constructor(private http: HttpClient) {}

  async signup(request: SignupRequest): Promise<void> {
    const response = this.http.post(this.API_URL + '/signup', request);
    await firstValueFrom(response);
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    const body = {
      email,
      password,
    };

    const response = this.http.post<ApiLoginResponse>(
      this.API_URL + '/login',
      body
    );

    const { ok, user, token } = await firstValueFrom(response);

    return {
      user: new User(user),
      token,
    };
  }

  async loginWithToken(): Promise<User> {
    const response = this.http.post<ApiLoginResponse>(
      this.API_URL + '/login/token',
      {}
    );

    const { ok, user } = await firstValueFrom(response);

    return new User(user);
  }
}

interface ApiLoginResponse {
  ok: boolean;
  user: UserDto;
  token: string;
}
