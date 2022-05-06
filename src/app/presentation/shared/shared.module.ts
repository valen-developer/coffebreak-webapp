import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CircleProfileComponent } from './components/circle-profile/circle-profile.component';
import { SearchInputComponent } from './components/search-input/search-input.component';

@NgModule({
  declarations: [CircleProfileComponent, SearchInputComponent],
  imports: [CommonModule],
  exports: [CircleProfileComponent, SearchInputComponent],
})
export class SharedModule {}
