import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { DOMService } from '../../services/dom.service';
import { ScrollPositionService } from './scroll-position.service';

@Directive({
  selector: '[appScrollPosition]',
})
export class ScrollPositionDirective {
  @Input() path!: string;

  constructor(
    private el: ElementRef<HTMLElement>,
    private scrollPositionService: ScrollPositionService
  ) {}

  @HostListener('scroll', ['$event'])
  onScroll(event: Event) {
    const scrollPosition = this.el.nativeElement.scrollTop;
    this.scrollPositionService.addScrollPosition(scrollPosition);
  }
}
