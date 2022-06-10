import { Injectable } from '@angular/core';
import { DOMService } from './dom.service';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  constructor(private domService: DOMService) {}

  public scrollToTop(): void {
    this.domService.getWindow()?.scrollTo({
      top: 0,
    });
  }

  public scrollTo(offset: number): void {
    this.domService.getWindow()?.scrollTo({
      top: offset,
    });
  }
}
