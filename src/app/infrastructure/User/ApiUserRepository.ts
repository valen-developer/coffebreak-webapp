import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { UserRepository } from 'src/app/domain/User/interfaces/UserRepository.interface';
import { User, UserDto } from 'src/app/domain/User/User.mode';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiUserRepository implements UserRepository {
  private _API_URL = environment.apiUrl + '/user';

  constructor(private http: HttpClient) {}

  public async update(user: User, image?: File): Promise<User> {
    const formData = new FormData();
    image && formData.append('file', image);
    formData.append('name', user.name.value);
    formData.append('email', user.email.value);

    const response$ = this.http.put<{ ok: true; user: UserDto }>(
      `${this._API_URL}/${user.uuid.value}`,
      formData
    );

    await firstValueFrom(response$);

    return user;
  }
}
