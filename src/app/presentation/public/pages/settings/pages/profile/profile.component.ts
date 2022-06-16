import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthStatusService } from 'src/app/application/Auth/AuthStatus.service';
import { PlaylistFinder } from 'src/app/application/Playlist/PlaylistFinder';
import { ImageGetter } from 'src/app/application/Shared/ImageGetter';
import { Playlist } from 'src/app/domain/Playlist/Playlist.model';
import { Nullable } from 'src/app/domain/Shared/types/Nullable.type';
import { User } from 'src/app/domain/User/User.mode';
import { asyncMap } from 'src/app/helpers/asyncMap';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  public user: Nullable<User>;
  public userImage: Nullable<string>;
  private userSubscription!: Subscription;

  private playlists: Playlist[] = [];
  public playlistsData: PlaylistData[] = [];

  constructor(
    private authStatus: AuthStatusService,
    private playlistFinder: PlaylistFinder,
    private imageGetter: ImageGetter
  ) {}

  ngOnInit(): void {
    this.userSubscriber();
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

  private async getPlaylists(): Promise<void> {
    if (!this.user) return;
    this.playlists = await this.playlistFinder.getPlayListByOwner(
      this.user?.uuid.value
    );

    this.playlistsData = await asyncMap(this.playlists, async (playlist) => {
      const image = await this.getImage(playlist.uuid.value);

      return {
        name: playlist.name.value,
        episodes: playlist.getEpisodesCount(),
        imageUrl: image ?? 'https://via.placeholder.com/150',
      };
    });
  }

  private userSubscriber(): void {
    this.userSubscription = this.authStatus.user$.subscribe({
      next: async (user) => {
        if (!user) return;
        this.user = user;
        this.userImage = await this.getImage(user.uuid.value);
        this.getPlaylists();
      },
    });
  }

  private async getImage(uuid: string): Promise<Nullable<string>> {
    return this.imageGetter.getDataUrlFromEntity(uuid);
  }
}

interface PlaylistData {
  name: string;
  episodes: number;
  imageUrl: string;
}
