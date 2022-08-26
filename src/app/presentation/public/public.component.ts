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

import { debounceTime, fromEvent, Observable, Subscription } from 'rxjs';
import { AuthStatusService } from 'src/app/application/Auth/AuthStatus.service';
import { UserLogger } from 'src/app/application/Auth/UserLogger.service';
import { EpisodeTimeTrackerFinder } from 'src/app/application/EpisodeTimeTracker/EpisodeTimeTrackerFinder.service';
import { PodcastEpisodeFinder } from 'src/app/application/PodcastEpisode/PodcastEpisodeFinder';
import { LastEpisodesRepository } from 'src/app/domain/PodcastEpisode/interfaces/LastEpisodesRepository.interface';
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
  private userSubscription!: Subscription;

  constructor(
    private renderer: Renderer2,
    private routeContainerScrollService: RouteContainerScrollService,
    private navbarAudioController: NavbarAudioController,
    private episodePlayer: EpisodePlayerService,
    private audioController: AudioController,
    private lastEpisoreRepository: LastEpisodesRepository,
    private episodeFinder: PodcastEpisodeFinder,
    private userLogger: UserLogger,
    private authStatus: AuthStatusService,
    private cdref: ChangeDetectorRef,
    private timeTrackerFinder: EpisodeTimeTrackerFinder
  ) {
    this.showAudioPlayer$ = this.navbarAudioController.show$;
  }

  ngAfterViewInit(): void {
    this.tryLogin();
    this.susbcribeToScrolling();
    this.scrollToSubscribe();
    this.getTimeTrackers();
  }

  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }

  async ngOnInit(): Promise<void> {
    const lastEpisode = await this.lastEpisoreRepository.getLastEar();

    if (!lastEpisode) return;

    const { episodes: episodeArray } = await this.episodeFinder.filter(
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
    this.userSubscription?.unsubscribe();
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

  private tryLogin(): void {
    this.userLogger.loginWithToken().catch(() => {});
  }

  private getTimeTrackers(): void {
    this.userSubscription = this.authStatus.user$.subscribe((user) => {
      if (!user) return;
      const sub = this.timeTrackerFinder.findByUser().subscribe({
        next: (timeTrackers) => {
          sub.unsubscribe();
        },
      });
    });
  }
}
