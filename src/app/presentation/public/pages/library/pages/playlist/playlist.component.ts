import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthStatusService } from 'src/app/application/Auth/AuthStatus.service';
import { PlaylistDeleter } from 'src/app/application/Playlist/PlaylistDeleter';
import { PlaylistFinder } from 'src/app/application/Playlist/PlaylistFinder';
import { ImageGetter } from 'src/app/application/Shared/ImageGetter';
import { Playlist } from 'src/app/domain/Playlist/Playlist.model';
import { Nullable } from 'src/app/domain/Shared/types/Nullable.type';
import { User } from 'src/app/domain/User/User.mode';
import { asyncMap } from 'src/app/helpers/asyncMap';
import { DeleteModalComponent } from 'src/app/presentation/shared/components/delete-modal/delete-modal.component';
import { ModalComponent } from 'src/app/presentation/shared/modules/modal/modal.component';
import { CrearePlaylistModalComponent } from '../../components/creare-playlist-modal/creare-playlist-modal.component';

@Component({
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
})
export class PlaylistComponent implements OnInit, OnDestroy {
  @ViewChild('modal', { static: true }) modal!: ModalComponent;

  public platyLists: Playlist[] = [];
  public playlistsData: PlaylistData[] = [];

  private user: Nullable<User>;
  private userSubscription!: Subscription;

  constructor(
    private playlistFinder: PlaylistFinder,
    private authStatus: AuthStatusService,
    private imageGetter: ImageGetter,
    private playlistDeleter: PlaylistDeleter
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

  public createNewPlaylist(): void {
    this.modal
      .show<any, Playlist>(CrearePlaylistModalComponent, {}, true)
      .then((response) => {
        if (!response) return this.modal.hide();

        // add to init of array
        this.platyLists.unshift(response);
        this.buildPlaylistData();
      });
  }

  public async deletePlaylist(uuid: string): Promise<void> {
    const platyList = this.platyLists.find(
      (playlist) => playlist.uuid.value === uuid
    );
    if (!platyList) return;

    const title = `la playlist ${platyList.name.value}`;
    const response = await this.modal.show(DeleteModalComponent, { title });
    if (!response) return;

    this.playlistDeleter
      .deletePlaylist(uuid)
      .then(() => {
        this.platyLists = this.platyLists.filter(
          (playlist) => playlist.uuid.value !== uuid
        );
        this.buildPlaylistData();
      })
      .catch(() => {});
  }
}

interface PlaylistData {
  uuid: string;
  name: string;
  description: string;
  episodes: number;
  imageUrl: string;
}
