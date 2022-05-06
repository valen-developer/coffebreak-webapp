import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CircleProfileComponent } from './components/circle-profile/circle-profile.component';

@NgModule({
  declarations: [CircleProfileComponent],
  imports: [CommonModule],
  exports: [CircleProfileComponent],
})
export class SharedModule {}
