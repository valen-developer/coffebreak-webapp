import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PodcastEpisodeFinder } from 'src/app/application/PodcastEpisode/PodcastEpisodeFinder';
import { PodcastEpisode } from 'src/app/domain/PodcastEpisode/PodcastEpisode.model';
import { PodcastEpisodeQuery } from 'src/app/domain/PodcastEpisode/PodcastEpisodeQuery';
import { EpisodePlayerService } from 'src/app/presentation/shared/modules/audio-player/services/episode-player.service';
import { NavbarAudioController } from 'src/app/presentation/shared/modules/audio-player/services/navbar-audio-controller.service';

@Component({
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.scss'],
})
export class EpisodeComponent implements OnInit, OnDestroy {
  public episode!: PodcastEpisode;

  constructor(
    private route: ActivatedRoute,
    private navbarAudioController: NavbarAudioController,
    private episodePlayerService: EpisodePlayerService,
    private episodeFinder: PodcastEpisodeFinder
  ) {}

  ngOnInit(): void {
    this.navbarAudioController.hide();

    const query: PodcastEpisodeQuery = {
      uuid_equals: this.getUuid(),
    };

    this.episodeFinder.filter(query, {}).then((episodeArray) => {
      const episode = episodeArray[0];
      this.episode = episode;
      this.episodePlayerService.setEpisode(episode);
    });
  }

  ngOnDestroy(): void {
    this.navbarAudioController.show();
  }

  private getUuid(): string {
    return this.route.snapshot.paramMap.get('uuid') as string;
  }
}
