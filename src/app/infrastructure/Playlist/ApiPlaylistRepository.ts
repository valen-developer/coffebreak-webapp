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

  public save(playlist: Playlist): Promise<void> {
    throw new Error('Method not implemented.');
  }
  public update(playlist: Playlist): Promise<void> {
    throw new Error('Method not implemented.');
  }
  public delete(uuid: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  public getPlaylist(uuid: string): Promise<Playlist> {
    const response$ = this.http
      .get<{ ok: boolean; playlist: PlaylistDTO }>(`${this._API_URL}/${uuid}`)
      .pipe(pluck('playlist'));

    return firstValueFrom(response$).then((dto) => new Playlist(dto));
  }
  public getPlaylistByOwn(own: string): Promise<Playlist[]> {
    throw new Error('Method not implemented.');
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
}
