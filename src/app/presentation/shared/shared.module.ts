import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AudioPlayerModule } from './modules/audio-player/audio-player.module';

import { CircleProfileComponent } from './components/circle-profile/circle-profile.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './components/input/input.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { ModalModule } from './modules/modal/modal.module';

@NgModule({
  declarations: [
    CircleProfileComponent,
    SearchInputComponent,
    InputComponent,
    CheckboxComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, AudioPlayerModule, ModalModule],
  exports: [
    CircleProfileComponent,
    SearchInputComponent,
    AudioPlayerModule,
    InputComponent,
    CheckboxComponent,
    ModalModule,
  ],
})
export class SharedModule {}
