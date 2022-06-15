import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';

import { Socket } from 'ngx-socket-io';

import { debounceTime, fromEvent, Observable, Subscription } from 'rxjs';
import { PodcastEpisodeFinder } from 'src/app/application/PodcastEpisode/PodcastEpisodeFinder';
import { Playlist } from 'src/app/domain/Playlist/Playlist.model';
import { Events } from 'src/app/domain/PodcastEpisode/constants/Events';
import { LastEpisodesRepository } from 'src/app/domain/PodcastEpisode/interfaces/LastEpisodesRepository.interface';
import {
  PodcastEpisode,
  PodcastEpisodeDTO,
} from 'src/app/domain/PodcastEpisode/PodcastEpisode.model';
import { AlertService } from '../shared/modules/alert/alert.service';
import { AudioController } from '../shared/modules/audio-player/services/audio-controller.service';
import { EpisodePlayerService } from '../shared/modules/audio-player/services/episode-player.service';
import { NavbarAudioController } from '../shared/modules/audio-player/services/navbar-audio-controller.service';
import { RouteContainerScrollService } from './services/route-container-scroll.service';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss'],
})
export class PublicComponent
  implements OnInit, OnDestroy, AfterContentChecked, AfterViewInit
{
  @ViewChild('routeContainer', { static: true })
  routeContainer!: ElementRef<HTMLDivElement>;

  public showAudioPlayer$!: Observable<boolean>;

  private scrollSubscription!: Subscription;

  constructor(
    private socket: Socket,
    private renderer: Renderer2,
    private routeContainerScrollService: RouteContainerScrollService,
    private navbarAudioController: NavbarAudioController,
    private episodePlayer: EpisodePlayerService,
    private audioController: AudioController,
    private lastEpisoreRepository: LastEpisodesRepository,
    private episodeFinder: PodcastEpisodeFinder,
    private cdref: ChangeDetectorRef,
    private alert: AlertService
  ) {
    this.showAudioPlayer$ = this.navbarAudioController.show$;

    this.socket.fromEvent<PodcastEpisodeDTO>(Events.NEW_EPISODE).subscribe({
      next: (data) => {
        console.log('New episode');
        console.log(data.episode);
        this.alert.info(`New episode: ${data.title}`, false);
      },
      error: (err) => {
        this.alert.danger('Eerror');
      },
    });

    this.socket.fromEvent<Playlist>(Events.NEW_CHANNEL).subscribe({
      next: (data) => {
        console.log('New channel');

        this.alert.info(`New channel: ${data.name}`, false);
      },
    });
  }

  ngAfterViewInit(): void {
    this.susbcribeToScrolling();
    this.scrollToSubscribe();
  }

  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }

  async ngOnInit(): Promise<void> {
    const lastEpisode = await this.lastEpisoreRepository.getLastEar();

    if (!lastEpisode) return;

    const episodeArray = await this.episodeFinder.filter(
      { uuid_equals: lastEpisode.uuid },
      {}
    );
    const episode = episodeArray[0];

    this.episodePlayer.setEpisode(episode);
    this.audioController.setCurrentTime(parseInt(lastEpisode.time, 10));

    this.navbarAudioController.show();
  }

  ngOnDestroy(): void {
    this.scrollSubscription?.unsubscribe();
  }

  private susbcribeToScrolling(): void {
    if (!this.routeContainer) return;

    const scroll$ = fromEvent(this.routeContainer.nativeElement, 'scroll');

    const subs = scroll$.pipe(debounceTime(300)).subscribe((event) => {
      const scrollTop = this.routeContainer.nativeElement.scrollTop;
      this.routeContainerScrollService.setScrollData(scrollTop);
    });

    this.scrollSubscription = subs;
  }

  private scrollToSubscribe(): void {
    this.routeContainerScrollService.setScroll$.subscribe(
      (scrollTop: number) => {
        this.renderer.setProperty(
          this.routeContainer.nativeElement,
          'scrollTop',
          scrollTop
        );
      }
    );
  }
}
