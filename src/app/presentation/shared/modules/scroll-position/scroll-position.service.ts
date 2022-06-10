import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ScrollPositionService {
  private scrollPositions: ScrollPositions[] = [];
  private currentPath!: string;

  constructor(private router: Router) {}

  public addScrollPosition(scrollPosition: number): void {
    const currentPath = this.router.url;

    const position = this.scrollPositions.find((p) => p.path === currentPath);

    if (!position) {
      this.scrollPositions.push({
        path: currentPath,
        scrollPosition,
      });
      return;
    }

    position.scrollPosition = scrollPosition;
  }

  public getScrollPosition(path: string): number {
    const position = this.scrollPositions.find((p) => p.path === path);
    if (!position) {
      return 0;
    }

    return position.scrollPosition;
  }
}

interface ScrollPositions {
  path: string;
  scrollPosition: number;
}
