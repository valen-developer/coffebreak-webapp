import { Injectable } from '@angular/core';
import { DOMService } from './dom.service';

@Injectable()
export class ScrollService {
  constructor(private domService: DOMService) {}

  public scrollToTop(): void {
    this.domService.getWindow()?.scrollTo({
      top: 0,
    });
  }
}
