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
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
})
export class PlaylistComponent implements OnInit, OnDestroy {
  public platyLists: Playlist[] = [];
  public playlistsData: PlaylistData[] = [];

  private user: Nullable<User>;
  private userSubscription!: Subscription;

  constructor(
    private playlistFinder: PlaylistFinder,
    private authStatus: AuthStatusService,
    private imageGetter: ImageGetter
  ) {}

  ngOnInit(): void {
    this.subsCribeToUser();
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

  private subsCribeToUser(): void {
    this.userSubscription = this.authStatus.user$.subscribe({
      next: (user) => {
        console.log(user);
        this.user = user;
        this.getPlaylists();
      },
    });
  }

  private async getPlaylists(): Promise<void> {
    if (!this.user) return;

    this.platyLists = await this.playlistFinder.getPlayListByOwner(
      this.user.uuid.value
    );

    this.buildPlaylistData();
  }

  private async buildPlaylistData(): Promise<void> {
    if (!this.platyLists) return;

    this.playlistsData = await asyncMap(this.platyLists, async (playlist) => {
      const image = await this.getImage(playlist);
      return {
        uuid: playlist.uuid.value,
        name: playlist.name.value,
        description: playlist.description.value,
        episodes: playlist.getEpisodesCount(),
        imageUrl: image,
      };
    });
  }

  private async getImage(playlist: Playlist): Promise<string> {
    if (!playlist) return '';

    return await this.imageGetter.getDataUrlFromEntity(playlist.uuid.value);
  }
}

interface PlaylistData {
  uuid: string;
  name: string;
  description: string;
  episodes: number;
  imageUrl: string;
}
