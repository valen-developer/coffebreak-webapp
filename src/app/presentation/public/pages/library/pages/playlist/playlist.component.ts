import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouteConfigLoadEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthStatusService } from 'src/app/application/Auth/AuthStatus.service';
import { PlaylistCreator } from 'src/app/application/Playlist/PlaylistCreator';
import { PlaylistDeleter } from 'src/app/application/Playlist/PlaylistDeleter';
import { PlaylistFinder } from 'src/app/application/Playlist/PlaylistFinder';
import { PlaylistUpdater } from 'src/app/application/Playlist/PlaylistUpdater';
import { ImageGetter } from 'src/app/application/Shared/ImageGetter';
import { Playlist } from 'src/app/domain/Playlist/Playlist.model';
import { PlaylistQuery } from 'src/app/domain/Playlist/PlaylistQuery';
import { Nullable } from 'src/app/domain/Shared/types/Nullable.type';
import { User } from 'src/app/domain/User/User.mode';
import { asyncMap } from 'src/app/helpers/asyncMap';
import { DeleteModalComponent } from 'src/app/presentation/shared/components/delete-modal/delete-modal.component';
import { AlertService } from 'src/app/presentation/shared/modules/alert/alert.service';
import { PlaylistPlayerService } from 'src/app/presentation/shared/modules/audio-player/services/playlist-player.service';
import { ModalComponent } from 'src/app/presentation/shared/modules/modal/modal.component';
import { DOMService } from 'src/app/presentation/shared/services/dom.service';
import {
  CrearePlaylistModalComponent,
  NewPlaylistModalResponse,
} from '../../components/creare-playlist-modal/creare-playlist-modal.component';
import { SearchLibraryService } from '../../services/search-library.service';

@Component({
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
})
export class PlaylistComponent implements OnInit, OnDestroy {
  @ViewChild('modal', { static: true }) modal!: ModalComponent;

  public platyLists: Playlist[] = [];
  public playlistsData: PlaylistData[] = [];

  public playlistFromRoute: Nullable<Playlist>;

  private user: Nullable<User>;
  private userSubscription!: Subscription;

  private searchSubscription!: Subscription;

  constructor(
    private router: Router,
    private domService: DOMService,
    private playlistFinder: PlaylistFinder,
    private playlistDeleter: PlaylistDeleter,
    private playlistCreator: PlaylistCreator,
    private playlistUpdater: PlaylistUpdater,
    private authStatus: AuthStatusService,
    private imageGetter: ImageGetter,
    private alert: AlertService,
    private searchService: SearchLibraryService,
    private playlistPlayer: PlaylistPlayerService
  ) {}

  ngOnInit(): void {
    this.subsCribeToUser();
    this.searchSubscribe();

    this.playlistFromRoute = this.getPlaylistFromRoute();
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
    this.searchSubscription?.unsubscribe();
  }

  public isFromUrl(playlistUuid: string): boolean {
    if (!this.playlistFromRoute) return false;

    const isSame = this.playlistFromRoute?.uuid?.value === playlistUuid;
    return isSame;
  }

  private getPlaylistFromRoute(): Nullable<Playlist> {
    if (!this.domService.isBrowser()) return null;

    const state =
      this.router.getCurrentNavigation()?.extras?.state ?? history.state;

    const playlist: Nullable<Playlist> = state?.playlist;

    if (!playlist) return null;

    return playlist;
  }

  private subsCribeToUser(): void {
    this.userSubscription = this.authStatus.user$.subscribe({
      next: (user) => {
        this.user = user;
      },
    });
  }

  private searchSubscribe(): void {
    this.searchSubscription = this.searchService.search$.subscribe({
      next: (search) => {
        this.getPlaylists(search);
      },
    });
  }

  private async getPlaylists(search?: Nullable<string>): Promise<void> {
    if (!this.user) return;

    const query: PlaylistQuery = {
      ...(search
        ? {
            name_contains: search,
          }
        : {}),
    };

    this.platyLists = await this.playlistFinder.filter(query);

    this.buildPlaylistData();
  }

  private async buildPlaylistData(): Promise<void> {
    if (!this.platyLists) return;

    this.playlistsData = await asyncMap(this.platyLists, async (playlist) => {
      const image = await this.getImage(playlist).catch(() => {
        return 'https://via.placeholder.com/150';
      });
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

  public async openCreateModal(): Promise<void> {
    const response = await this.openModalPlaylist('Crear nueva playlist');
    if (!response) return this.modal.hide();

    const { name, description, image } = response;

    try {
      const playlist = await this.playlistCreator.createPlaylist({
        name,
        description,
        image,
        own: this.user?.uuid.value ?? '',
      });

      // push on initial data
      this.platyLists = [playlist, ...this.platyLists];
      this.buildPlaylistData();

      this.alert.success({
        message: 'Playlist creada correctamente',
        subtitle: `${name} creada`,
      });
    } catch (error: any) {
      this.alert.danger({
        message: 'Error al crear playlist',
        ...(error.message ? { subtitle: error.message } : {}),
      });
    }
  }

  public async openEditModal(uuid: string): Promise<void> {
    const playlist = this.platyLists.find(
      (playlist) => playlist.uuid.value === uuid
    );
    if (!playlist) return;

    const response = await this.openModalPlaylist(
      `Editar playlist: ${playlist.name.value} `,
      playlist
    );
    if (!response) return this.modal.hide();

    const { name, description, image } = response;

    try {
      const updatedPlaylist = new Playlist({
        uuid: playlist.uuid.value,
        name,
        description,
        episodes: playlist.getEpisodes().value,
        own: playlist.getOwn().value,
      });

      await this.playlistUpdater.update({
        playlist: updatedPlaylist,
        image,
      });

      this.platyLists = this.platyLists.map((p) => {
        if (p.uuid.value === playlist.uuid.value) {
          return updatedPlaylist;
        }
        return p;
      });

      this.buildPlaylistData();
      this.alert.success({
        message: 'Playlist actualizada correctamente',
        subtitle: `${name} actualizada`,
      });
    } catch (error: any) {
      this.alert.danger({
        message: 'Error al actualizar playlist',
        ...(error.message ? { subtitle: error.message } : {}),
      });
    }
  }

  private openModalPlaylist(
    title: string,
    playlist?: Playlist
  ): Promise<NewPlaylistModalResponse | void> {
    return this.modal.show(
      CrearePlaylistModalComponent,
      { title, playlist },
      true
    );
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
        this.setNullPlaylistPlayerIfDeleted(uuid);

        this.alert.success({
          message: 'Playlist eliminada correctamente',
          subtitle: `${platyList.name.value} eliminada`,
        });
      })
      .catch(() => {});
  }

  private setNullPlaylistPlayerIfDeleted(deletedUuid: string): void {
    const playingPlaylist = this.playlistPlayer.getPlaylist();
    if (!playingPlaylist) return;

    const isSame = playingPlaylist.uuid.value === deletedUuid;
    if (!isSame) return;

    this.playlistPlayer.setNullPlaylist();
  }
}

interface PlaylistData {
  uuid: string;
  name: string;
  description: string;
  episodes: number;
  imageUrl: string;
}
