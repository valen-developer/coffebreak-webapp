import { Component, OnInit } from '@angular/core';
import { EpisodeTimeTrackerLastService } from 'src/app/application/EpisodeTimeTracker/episode-time-tracker-last.service';
import { PodcastEpisodeFinder } from 'src/app/application/PodcastEpisode/PodcastEpisodeFinder';
import { EpisodeTimeTracker } from 'src/app/domain/EpisodeTimeTracker/EpisodeTimeTracker.model';
import { PodcastEpisode } from 'src/app/domain/PodcastEpisode/PodcastEpisode.model';
import { asyncMap } from 'src/app/helpers/asyncMap';

@Component({
  selector: 'app-last-ear',
  templateUrl: './last-ear.component.html',
  styleUrls: ['./last-ear.component.scss'],
})
export class LastEarComponent implements OnInit {
  public timeTrackers: EpisodeTimeTracker[] = [];
  public episodes: PodcastEpisode[] = [];

  constructor(
    private lastTimeTrackers: EpisodeTimeTrackerLastService,
    private episodeFinder: PodcastEpisodeFinder
  ) {}

  async ngOnInit(): Promise<void> {
    const timeTrackers = await this.getLastTimeTracker();
    this.timeTrackers = timeTrackers;

    const episodes = await this.getEpisodes();
    this.episodes = episodes;
  }

  private async getLastTimeTracker(): Promise<EpisodeTimeTracker[]> {
    const lastTimeTracker = await this.lastTimeTrackers.findByUser();

    return lastTimeTracker;
  }

  private async getEpisodes(): Promise<PodcastEpisode[]> {
    const episodes = await asyncMap(this.timeTrackers, async (timeTracker) => {
      const episode = await this.episodeFinder.find(
        timeTracker.episodeUuid.value
      );

      return episode;
    });

    return episodes;
  }
}
