import { Injectable } from '@angular/core';
import { firstValueFrom, pluck } from 'rxjs';
import { PlaylistRepository } from 'src/app/domain/Playlist/interfaces/PlaylistRepository.interface';
import { Playlist, PlaylistDTO } from 'src/app/domain/Playlist/Playlist.model';
import {
  PodcastEpisode,
  PodcastEpisodeDTO,
} from 'src/app/domain/PodcastEpisode/PodcastEpisode.model';
import { environment } from 'src/environments/environment';
import { ApiRepository } from '../Shared/ApiRepository';

@Injectable({
  providedIn: 'root',
})
export class ApiPlaylistRepository
  extends ApiRepository
  implements PlaylistRepository
{
  private _API_URL = environment.apiUrl + '/playlist';

  public async save(playlist: Playlist, image: Blob | File): Promise<Playlist> {
    const formData = new FormData();
    formData.append('uuid', playlist.uuid.value);
    formData.append('name', playlist.name.value);
    formData.append('description', playlist.description.value);
    formData.append('file', image);

    const response$ = this.http.post<{ ok: boolean; playlist: PlaylistDTO }>(
      this._API_URL,
      formData
    );

    const { playlist: playlistCreated } = await firstValueFrom(response$);

    return new Playlist(playlistCreated);
  }

  public update(playlist: Playlist): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async delete(uuid: string): Promise<void> {
    const response$ = this.http.delete<{ ok: boolean }>(
      `${this._API_URL}/${uuid}`
    );

    await firstValueFrom(response$);
  }

  public async getPlaylist(uuid: string): Promise<Playlist> {
    const response$ = this.http
      .get<{ ok: boolean; playlist: PlaylistDTO }>(`${this._API_URL}/${uuid}`)
      .pipe(pluck('playlist'));

    return firstValueFrom(response$).then((dto) => new Playlist(dto));
  }

  public async getPlaylistByOwn(own: string): Promise<Playlist[]> {
    const response$ = this.http
      .get<{ ok: boolean; playlist: PlaylistDTO[] }>(`${this._API_URL}/own`)
      .pipe(pluck('playlist'));

    const playlistsDTO = await firstValueFrom(response$);

    return playlistsDTO.map((p) => new Playlist(p));
  }

  public async getChannels(): Promise<Playlist[]> {
    const response$ = this.http
      .get<{ ok: boolean; channels: PlaylistDTO[] }>(
        `${this._API_URL}/channels`
      )
      .pipe(pluck('channels'));

    const channels = await firstValueFrom(response$).then((dtos) =>
      dtos.map((dto) => new Playlist(dto))
    );

    return channels;
  }

  public getEpisodes(playlist: string): Promise<PodcastEpisode[]> {
    const response$ = this.http
      .get<{ ok: boolean; episodes: PodcastEpisodeDTO[] }>(
        `${this._API_URL}/${playlist}/episodes`
      )
      .pipe(pluck('episodes'));

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

    const response$ = this.http.post<{ ok: boolean }>(
      `${this._API_URL}/${playlist.uuid.value}/episode/add`,
      body
    );

    await firstValueFrom(response$);
  }

  public async removeEpisode(
    playlist: Playlist,
    episode: PodcastEpisode
  ): Promise<void> {
    const body = {
      episodeUuid: episode.uuid.value,
    };

    const response$ = this.http.post<{ ok: boolean }>(
      `${this._API_URL}/${playlist.uuid.value}/episode/remove`,
      body
    );

    await firstValueFrom(response$);
  }
}
