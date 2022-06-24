import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ImageRepository } from 'src/app/domain/Shared/interfaces/ImageRepository.interface';
import { blobToDataUrl } from 'src/app/helpers/blobToDataUrl';
import { environment } from 'src/environments/environment';
import { ApiRepository } from '../Shared/ApiRepository';

@Injectable({
  providedIn: 'root',
})
export class ApiImageRepository
  extends ApiRepository
  implements ImageRepository
{
  private _API_URL = environment.apiUrl + '/image';

  public async getDataUrlFromEntity(entity: string): Promise<string> {
    const response$ = this.http.get(`${this._API_URL}/entity/${entity}`, {
      responseType: 'arraybuffer',
    });
    const file = await firstValueFrom(response$);
    const blob = new File([file], 'image.png', { type: 'image/png' });

    const dataUrl = await blobToDataUrl(blob);

    return dataUrl;
  }
}
