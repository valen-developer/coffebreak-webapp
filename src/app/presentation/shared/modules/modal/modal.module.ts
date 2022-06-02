import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { ModalDirective } from './modal.directive';

@NgModule({
  declarations: [ModalComponent, ModalDirective],
  exports: [ModalComponent, ModalDirective],
  imports: [CommonModule],
})
export class ModalModule {}
