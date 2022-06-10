import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollPositionDirective } from './scroll-position.directive';

@NgModule({
  declarations: [ScrollPositionDirective],
  imports: [CommonModule],
  exports: [ScrollPositionDirective],
})
export class ScrollPositionModule {}
