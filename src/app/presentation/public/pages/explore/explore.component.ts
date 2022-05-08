import { Component, OnInit } from '@angular/core';
import { PodcastEpisodeFinder } from 'src/app/application/PodcastEpisode/PodcastEpisodeFinder';
import {
  PodcastEpisode,
  PodcastEpisodeDTO,
} from 'src/app/domain/PodcastEpisode/PodcastEpisode.model';
import { PodcastEpisodeQuery } from 'src/app/domain/PodcastEpisode/PodcastEpisodeQuery';
import { Paginator } from 'src/app/domain/Shared/interfaces/Paginator.interface';

@Component({
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
})
export class ExploreComponent implements OnInit {
  public episodes: PodcastEpisode[] = [];

  constructor(private episodeFinder: PodcastEpisodeFinder) {}

  ngOnInit(): void {}

  public onSearch(query: string): void {
    if (!query) {
      this.episodes = [];
      return;
    }

    this.search(query);
  }

  private search(criteria: string): void {
    const query: PodcastEpisodeQuery = {
      title_contains: criteria,
    };

    const paginator: Paginator<PodcastEpisodeDTO> = {
      sort_by: 'pubDate',
      order: 'desc',
    };

    this.episodeFinder.filter(query, paginator).then((episodes) => {
      this.episodes = episodes;
    });
  }
}
