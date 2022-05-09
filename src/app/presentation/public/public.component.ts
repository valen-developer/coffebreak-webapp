import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import { PodcastEpisodeFinder } from 'src/app/application/PodcastEpisode/PodcastEpisodeFinder';
import { LastEpisodesRepository } from 'src/app/domain/PodcastEpisode/interfaces/LastEpisodesRepository.interface';
import { AudioController } from '../shared/modules/audio-player/services/audio-controller.service';
import { EpisodePlayerService } from '../shared/modules/audio-player/services/episode-player.service';
import { NavbarAudioController } from '../shared/modules/audio-player/services/navbar-audio-controller.service';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss'],
})
export class PublicComponent implements OnInit, AfterContentChecked {
  public showAudioPlayer$!: Observable<boolean>;

  constructor(
    private navbarAudioController: NavbarAudioController,
    private episodePlayer: EpisodePlayerService,
    private audioController: AudioController,
    private lastEpisoreRepository: LastEpisodesRepository,
    private episodeFinder: PodcastEpisodeFinder,
    private cdref: ChangeDetectorRef
  ) {
    this.showAudioPlayer$ = this.navbarAudioController.show$;
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
}
