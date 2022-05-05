import { Injectable } from '@angular/core';
import { Nullable } from 'src/app/domain/Shared/types/Nullable.type';
import { DOMService } from './dom.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private domService: DOMService) {}

  public set(key: string, value: string): void {
    if (this.domService.isBrowser()) {
      localStorage.setItem(key, value);
    }
  }

  public get(key: string): Nullable<string> {
    if (this.domService.isBrowser()) {
      return localStorage.getItem(key);
    }

    return null;
  }

  public remove(key: string): void {
    if (this.domService.isBrowser()) {
      localStorage.removeItem(key);
    }
  }
}
