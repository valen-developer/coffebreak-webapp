import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PodcastEpisode } from 'src/app/domain/PodcastEpisode/PodcastEpisode.model';
import { Nullable } from 'src/app/domain/Shared/types/Nullable.type';
import { AudioController } from '../services/audio-controller.service';
import { EpisodePlayerService } from '../services/episode-player.service';
import { NavbarAudioController } from '../services/navbar-audio-controller.service';

@Component({
  selector: 'app-navbar-audio-player',
  templateUrl: './navbar-audio-player.component.html',
  styleUrls: ['./navbar-audio-player.component.scss'],
})
export class NavbarAudioPlayerComponent implements OnInit, OnDestroy {
  public episode!: Nullable<PodcastEpisode>;

  public playStatus = false;
  public percent = 0;

  private playingStatusSubscription!: Subscription;
  private timeSubscription!: Subscription;

  constructor(
    private episodePlayer: EpisodePlayerService,
    private audioController: AudioController
  ) {
    this.episodePlayer.episode$.subscribe((e) => {
      this.episode = e;
    });
  }

  ngOnInit(): void {
    this.setupSubscriptions();
  }

  ngOnDestroy(): void {
    this.unSubscribe();
  }

  public togglePlay(): void {
    this.audioController.togglePlayPause();
  }

  private unSubscribe(): void {
    this.playingStatusSubscription?.unsubscribe();
    this.timeSubscription?.unsubscribe();
  }

  private setupSubscriptions(): void {
    this.setupTimeSubscription();
    this.setupPlayinsStatusSubscription();
  }

  private setupPlayinsStatusSubscription(): void {
    this.playingStatusSubscription =
      this.audioController.playingStatus$.subscribe({
        next: (status) => {
          this.playStatus = status;
        },
      });
  }

  private setupTimeSubscription(): void {
    this.timeSubscription = this.audioController.currentTime$.subscribe({
      next: (time) => {
        const duration = this.episode?.duration.value ?? 1;
        this.percent = time / duration;
        console.log(this.percent);
      },
    });
  }
}
