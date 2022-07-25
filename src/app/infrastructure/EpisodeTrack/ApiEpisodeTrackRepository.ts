import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import {
  EpisodeTrack,
  EpisodeTrackDto,
} from 'src/app/domain/EpisodeTrack/EpisodeTrack.model';
import { EpisodeTrackRepository } from 'src/app/domain/EpisodeTrack/interfaces/EpisodeTrackRepository.interface';
import { environment } from 'src/environments/environment';
import { ApiRepository } from '../Shared/ApiRepository';

@Injectable({
  providedIn: 'root',
})
export class ApiEpisodeTrackRepository
  extends ApiRepository
  implements EpisodeTrackRepository
{
  private _API_URL = environment.apiUrl;

  public async findByEpisode(episodeUuid: string): Promise<EpisodeTrack[]> {
    const url = `${this._API_URL}/episode-track/episode/${episodeUuid}`;

    const response = this.http.get<EpisodeTrackDto[]>(url);

    const episodeTracks = await firstValueFrom(response).then((arr) =>
      arr.map((dto) => new EpisodeTrack(dto))
    );

    return episodeTracks;
  }
}
