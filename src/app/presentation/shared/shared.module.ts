import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AudioPlayerModule } from './modules/audio-player/audio-player.module';

import { CircleProfileComponent } from './components/circle-profile/circle-profile.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './components/input/input.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { ModalModule } from './modules/modal/modal.module';
import { DropzoneDirective } from './directives/dropzone.directive';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';
import { TimerSettingsModalComponent } from './components/timer-settings-modal/timer-settings-modal.component';
import { TimerInputComponent } from './components/timer-input/timer-input.component';
import { TimerProgressCircleComponent } from './components/timer-progress-circle/timer-progress-circle.component';
import { TimerIconComponent } from './components/timer-icon/timer-icon.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CircleProfileComponent,
    SearchInputComponent,
    InputComponent,
    CheckboxComponent,
    DropzoneDirective,
    DeleteModalComponent,
    TimerSettingsModalComponent,
    TimerInputComponent,
    TimerProgressCircleComponent,
    TimerIconComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    AudioPlayerModule,
    ModalModule,
  ],
  exports: [
    CircleProfileComponent,
    SearchInputComponent,
    AudioPlayerModule,
    InputComponent,
    CheckboxComponent,
    ModalModule,
    DropzoneDirective,
    DeleteModalComponent,
    TimerSettingsModalComponent,
    TimerIconComponent,
  ],
})
export class SharedModule {}
