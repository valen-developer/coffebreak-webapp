import { Injectable } from '@angular/core';
import { ImageRepository } from 'src/app/domain/Shared/interfaces/ImageRepository.interface';

@Injectable({
  providedIn: 'root',
})
export class ImageGetter {
  constructor(private imageRepository: ImageRepository) {}

  public async getDataUrlFromEntity(entity: string): Promise<string> {
    return this.imageRepository.getDataUrlFromEntity(entity);
  }
}
