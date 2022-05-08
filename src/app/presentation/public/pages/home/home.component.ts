import { Component, OnInit } from '@angular/core';
import { PodcastEpisodeFinder } from 'src/app/application/PodcastEpisode/PodcastEpisodeFinder';
import { PodcastEpisode } from 'src/app/domain/PodcastEpisode/PodcastEpisode.model';
import { Entity } from '../../components/episode-card/episode-card.component';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public lastEpisodes: Entity[] = [];

  constructor(private podcastFinder: PodcastEpisodeFinder) {}

  ngOnInit(): void {
    this.getLastEpisodes();
  }

  private getLastEpisodes(): void {
    this.podcastFinder.lastMonths(3).then((episodes) => {
      this.lastEpisodes = episodes.map((e) => ({
        title: `Episodio ${e.episode}`,
        description: e.title.value,
        imageUrl: e.imageUrl.value,
      }));
    });
  }
}
