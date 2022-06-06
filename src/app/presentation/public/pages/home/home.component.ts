import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthStatusService } from 'src/app/application/Auth/AuthStatus.service';
import { PlaylistFinder } from 'src/app/application/Playlist/PlaylistFinder';
import { PodcastEpisodeFinder } from 'src/app/application/PodcastEpisode/PodcastEpisodeFinder';
import { ImageGetter } from 'src/app/application/Shared/ImageGetter';
import { PodcastEpisode } from 'src/app/domain/PodcastEpisode/PodcastEpisode.model';
import { Nullable } from 'src/app/domain/Shared/types/Nullable.type';
import { User } from 'src/app/domain/User/User.mode';
import { asyncMap } from 'src/app/helpers/asyncMap';
import { Entity } from '../../components/episode-card/episode-card.component';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public lastEpisodes: Entity[] = [];
  public channels: Entity[] = [];

  public user: Nullable<User>;
  private userSubscription!: Subscription;

  constructor(
    private podcastFinder: PodcastEpisodeFinder,
    private playlistFinder: PlaylistFinder,
    private imageGetter: ImageGetter,
    private authStatus: AuthStatusService
  ) {}

  ngOnInit(): void {
    this.subscribeToUser();
    this.getLastEpisodes();
    this.getChannels();
  }

  private subscribeToUser(): void {
    this.userSubscription = this.authStatus.user$.subscribe({
      next: (user) => {
        this.user = user;
      },
    });
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
