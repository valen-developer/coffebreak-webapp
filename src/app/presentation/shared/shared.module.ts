import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AudioPlayerModule } from './modules/audio-player/audio-player.module';

import { CircleProfileComponent } from './components/circle-profile/circle-profile.component';
import { SearchInputComponent } from './components/search-input/search-input.component';

@NgModule({
  declarations: [CircleProfileComponent, SearchInputComponent],
  imports: [CommonModule, AudioPlayerModule],
  exports: [CircleProfileComponent, SearchInputComponent, AudioPlayerModule],
})
export class SharedModule {}
