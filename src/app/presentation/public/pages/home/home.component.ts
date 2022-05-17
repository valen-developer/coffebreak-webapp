import { Component, OnInit } from '@angular/core';
import { PlaylistFinder } from 'src/app/application/Playlist/PlaylistFinder';
import { PodcastEpisodeFinder } from 'src/app/application/PodcastEpisode/PodcastEpisodeFinder';
import { ImageGetter } from 'src/app/application/Shared/ImageGetter';
import { PodcastEpisode } from 'src/app/domain/PodcastEpisode/PodcastEpisode.model';
import { asyncMap } from 'src/app/helpers/asyncMap';
import { Entity } from '../../components/episode-card/episode-card.component';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public lastEpisodes: Entity[] = [];
  public channels: Entity[] = [];

  constructor(
    private podcastFinder: PodcastEpisodeFinder,
    private playlistFinder: PlaylistFinder,
    private imageGetter: ImageGetter
  ) {}

  ngOnInit(): void {
    this.getLastEpisodes();
    this.getChannels();
  }

  private getLastEpisodes(): void {
    this.podcastFinder.lastMonths(3).then((episodes) => {
      this.lastEpisodes = episodes.map((e) => ({
        title: `Episodio ${e.episode}`,
        description: e.title.value,
        imageUrl: e.imageUrl.value,
        uuid: e.uuid.value,
      }));
    });
  }

  private async getChannels(): Promise<void> {
    const channels = await this.playlistFinder.getChannels();
    const entities: Entity[] = await asyncMap(channels, async (ch) => {
      const imageUrl = await this.imageGetter.getDataUrlFromEntity(
        ch.uuid.value
      );
      return {
        uuid: ch.uuid.value,
        title: ch.name.value,
        description: ch.description.value,
        imageUrl,
      };
    });

    this.channels = entities;
  }
}
