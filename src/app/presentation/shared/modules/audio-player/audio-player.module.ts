import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrincipalAudioPlayerComponent } from './principal-audio-player/principal-audio-player.component';
import { TimeBarComponent } from './time-bar/time-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SliderComponent } from './slider/slider.component';
import { VolumeBarComponent } from './volume-bar/volume-bar.component';
import { NavbarAudioPlayerComponent } from './navbar-audio-player/navbar-audio-player.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PrincipalAudioPlayerComponent,
    TimeBarComponent,
    SliderComponent,
    VolumeBarComponent,
    NavbarAudioPlayerComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  exports: [PrincipalAudioPlayerComponent, NavbarAudioPlayerComponent],
})
export class AudioPlayerModule {}
