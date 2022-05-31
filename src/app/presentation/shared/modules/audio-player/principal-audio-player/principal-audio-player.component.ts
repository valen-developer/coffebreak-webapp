import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AudioController } from '../services/audio-controller.service';
import { EpisodePlayerService } from '../services/episode-player.service';
import { PlayerTimerService } from '../services/player-timer.service';

@Component({
  selector: 'app-principal-audio-player',
  templateUrl: './principal-audio-player.component.html',
  styleUrls: ['./principal-audio-player.component.scss'],
})
export class PrincipalAudioPlayerComponent implements OnInit, OnDestroy {
  @Input() duration!: number;
  @Input() isPlaylist = false;

  public playingStatus: boolean = false;
  public currentTimeString: string = '00:00';
  public percentRoute: number = 0;
  public percentVolume: number = 0;
  public volume = 0.8;

  public isRandom = false;

  private currentTimeSubscription!: Subscription;
  private playingStatusSubscription!: Subscription;
  private volumeSubscription!: Subscription;

  @Output() nextEmitter = new EventEmitter<void>();
  @Output() previousEmitter = new EventEmitter<void>();
  @Output() randomEmitter = new EventEmitter<void>();

  constructor(private audioController: AudioController) {}

  ngOnInit(): void {
    this.setupAudio();
  }

  ngOnDestroy(): void {
    this.currentTimeSubscription?.unsubscribe();
    this.playingStatusSubscription?.unsubscribe();
    this.volumeSubscription?.unsubscribe();
  }

  private setupAudio(): void {
    this.playingStatusSubscription =
      this.audioController.playingStatus$.subscribe({
        next: (status) => (this.playingStatus = status),
      });

    this.currentTimeSubscription = this.audioController.currentTime$.subscribe({
      next: (time) => {
        this.currentTimeString = this.secondsToTime(time);

        if (!this.duration) return;
        this.percentRoute = time / this.duration;
      },
    });

    this.volumeSubscription = this.audioController.volume$.subscribe({
      next: (volume) => {
        this.volume = volume;
        this.percentVolume = volume;
      },
    });
  }

  private secondsToTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;

    const minutesFixed = minutes < 10 ? `0${minutes}` : minutes;
    const secondsFixed = secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft;

    return `${minutesFixed}:${secondsFixed}`;
  }

  public togglePlayPause(): void {
    this.audioController.togglePlayPause();
  }

  public onTimeChange(percent: number): void {
    this.audioController.setCurrentTime(this.duration * percent);
  }

  public onVolumeChange(volume: number): void {
    this.audioController.setVolume(volume);
  }

  public toggleRandom(): void {
    this.isRandom = !this.isRandom;
    this.randomEmitter.emit();
  }

  public next(): void {
    this.nextEmitter.emit();
  }

  public previous(): void {
    this.previousEmitter.emit();
  }
}
