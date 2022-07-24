import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, pluck } from 'rxjs';
import { PlaylistRepository } from 'src/app/domain/Playlist/interfaces/PlaylistRepository.interface';
import { Playlist, PlaylistDTO } from 'src/app/domain/Playlist/Playlist.model';
import { PlaylistQuery } from 'src/app/domain/Playlist/PlaylistQuery';
import {
  PodcastEpisode,
  PodcastEpisodeDTO,
} from 'src/app/domain/PodcastEpisode/PodcastEpisode.model';
import { environment } from 'src/environments/environment';
import { ApiRepository } from '../Shared/ApiRepository';
import { PlaylistHttpCache } from './PlaylistHttpCache';

@Injectable({
  providedIn: 'root',
})
export class ApiPlaylistRepository
  extends ApiRepository
  implements PlaylistRepository
{
  private _API_URL = environment.apiUrl + '/playlist';

  constructor(
    protected override http: HttpClient,
    private playlistCache: PlaylistHttpCache
  ) {
    super(http);
  }

  public async duplicate(uuid: string): Promise<Playlist> {
    const response$ = this.http.post<PlaylistDTO>(
      `${this._API_URL}/duplicate/${uuid}`,
      {}
    );

    const playlist = await firstValueFrom(response$);

    this.playlistCache.clear();

    return new Playlist(playlist);
  }

  public async save(playlist: Playlist, image: File): Promise<Playlist> {
    const formData = new FormData();
    formData.append('uuid', playlist.uuid.value);
    formData.append('name', playlist.name.value);
    formData.append('description', playlist.description.value);
    formData.append('file', image);

    const response$ = this.http.post<PlaylistDTO>(this._API_URL, formData);

    const playlistCreated = await firstValueFrom(response$);

    this.playlistCache.clear();
    return new Playlist(playlistCreated);
  }

  public async update(playlist: Playlist, image?: File): Promise<void> {
    const formData = new FormData();
    formData.append('name', playlist.name.value);
    formData.append('description', playlist.description.value);
    if (image) {
      formData.append('file', image);
    }

    const response$ = this.http.put<void>(
      `${this._API_URL}/${playlist.uuid.value}`,
      formData
    );

    await firstValueFrom(response$);
  }

  public async delete(uuid: string): Promise<void> {
    const response$ = this.http.delete<void>(`${this._API_URL}/${uuid}`);

    await firstValueFrom(response$);
    this.playlistCache.clear();
  }

  public async getPlaylist(uuid: string): Promise<Playlist> {
    try {
      return this.playlistCache.getCachedPlaylistFromOwner(uuid);
    } catch (error) {
      const response$ = this.http.get<PlaylistDTO>(`${this._API_URL}/${uuid}`);

      const dto = await firstValueFrom(response$);

      return new Playlist(dto);
    }
  }

  public async searchPlaylist(query: PlaylistQuery): Promise<Playlist[]> {
    const response$ = this.http.post<PlaylistDTO[]>(
      `${this._API_URL}/search`,
      query
    );

    const playlists = await firstValueFrom(response$);

    return playlists.map((dto) => new Playlist(dto));
  }

  public async getPlaylistByOwn(own: string): Promise<Playlist[]> {
    try {
      return this.playlistCache.getCachedPlaylistArrayFromOwner();
    } catch (error) {
      const response$ = this.http.get<PlaylistDTO[]>(`${this._API_URL}/own`);

      const playlistsDTO = await firstValueFrom(response$);
      const playlists = playlistsDTO.map((p) => new Playlist(p));
      this.playlistCache.setValue(playlists);

      return playlists;
    }
  }

  public async getChannels(): Promise<Playlist[]> {
    const response$ = this.http.get<PlaylistDTO[]>(`${this._API_URL}/channels`);

    const channels = await firstValueFrom(response$).then((dtos) =>
      dtos.map((dto) => new Playlist(dto))
    );

    return channels;
  }

  public getEpisodes(playlist: string): Promise<PodcastEpisode[]> {
    const response$ = this.http.get<PodcastEpisodeDTO[]>(
      `${this._API_URL}/${playlist}/episodes`
    );

    return firstValueFrom(response$).then((episodes) =>
      episodes.map((dto) => new PodcastEpisode(dto))
    );
  }

  public async addEpisode(
    playlist: Playlist,
    episode: PodcastEpisode
  ): Promise<void> {
    const body = {
      episodeUuid: episode.uuid.value,
    };

    const response$ = this.http.post<void>(
      `${this._API_URL}/${playlist.uuid.value}/episode/add`,
      body
    );

    await firstValueFrom(response$);
    this.playlistCache.clear();
  }

  public async removeEpisode(
    playlist: Playlist,
    episode: PodcastEpisode
  ): Promise<void> {
    const body = {
      episodeUuid: episode.uuid.value,
    };

    const response$ = this.http.post<void>(
      `${this._API_URL}/${playlist.uuid.value}/episode/remove`,
      body
    );

    await firstValueFrom(response$);
    this.playlistCache.clear();
  }
}
