import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthStatusService } from 'src/app/application/Auth/AuthStatus.service';
import { PlaylistFinder } from 'src/app/application/Playlist/PlaylistFinder';
import { ImageGetter } from 'src/app/application/Shared/ImageGetter';
import { Playlist } from 'src/app/domain/Playlist/Playlist.model';
import { Nullable } from 'src/app/domain/Shared/types/Nullable.type';
import { User } from 'src/app/domain/User/User.mode';
import { asyncMap } from 'src/app/helpers/asyncMap';
import { IModal } from 'src/app/presentation/shared/modules/modal/modal.interface';

@Component({
  selector: 'app-playlist-selector-modal',
  templateUrl: './playlist-selector-modal.component.html',
  styleUrls: ['./playlist-selector-modal.component.scss'],
})
export class PlaylistSelectorModalComponent
  implements OnInit, OnDestroy, IModal<any, Playlist>
{
  initialState: any;
  responseEmitter: EventEmitter<Playlist> = new EventEmitter();
  closeEmitter: EventEmitter<void> = new EventEmitter();

  private playlists: Playlist[] = [];
  public playlistsData: PlaylistData[] = [];
  private user!: Nullable<User>;
  public isAuthenticated = false;

  private userSusbscription!: Subscription;

  constructor(
    private playlistFinder: PlaylistFinder,
    private authStatus: AuthStatusService,
    private imageGetter: ImageGetter
  ) {}

  onSubmit(): void {}
  hide(): void {
    this.closeEmitter.emit();
  }

  ngOnInit(): void {
    this.subscribeToUser();
  }

  ngOnDestroy(): void {
    this.userSusbscription?.unsubscribe();
  }

  public onSelectPlaylist(playlistData: PlaylistData): void {
    const playlist: Nullable<Playlist> = this.playlists.find(
      (p) => p.uuid.value === playlistData.uuid
    );

    if (!playlist) return;

    this.responseEmitter.emit(playlist);
  }

  private subscribeToUser(): void {
    this.userSusbscription = this.authStatus.user$.subscribe({
      next: (user) => {
        if (!user) return;

        this.user = user;
        this.isAuthenticated = true;
        this.getPlaylists(user.uuid.value);
      },
    });
  }

  private async getPlaylists(userUuid: string): Promise<void> {
    this.playlists = await this.playlistFinder.getPlayListByOwner(userUuid);
    this.buildPlaylistData();
  }

  private async buildPlaylistData(): Promise<void> {
    if (!this.playlists) return;

    this.playlistsData = await asyncMap(this.playlists, async (playlist) => {
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
