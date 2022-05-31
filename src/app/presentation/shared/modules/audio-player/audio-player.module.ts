import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavbarAudioPlayerComponent } from './navbar-audio-player/navbar-audio-player.component';
import { PrincipalAudioPlayerComponent } from './principal-audio-player/principal-audio-player.component';
import { PlayerTimerService } from './services/player-timer.service';
import { SliderComponent } from './slider/slider.component';
import { TimeBarComponent } from './time-bar/time-bar.component';
import { VolumeBarComponent } from './volume-bar/volume-bar.component';

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
