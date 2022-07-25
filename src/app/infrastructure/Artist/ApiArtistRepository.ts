import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Artist, ArtistDTO } from 'src/app/domain/Artist/Artist.model';
import { ArtistQuery } from 'src/app/domain/Artist/ArtistQuery';
import { ArtistRepository } from 'src/app/domain/Artist/interfaces/ArtistRepository.interface';
import {
  PodcastEpisode,
  PodcastEpisodeDTO,
} from 'src/app/domain/PodcastEpisode/PodcastEpisode.model';
import { Paginated } from 'src/app/helpers/Paginated';
import { environment } from 'src/environments/environment';
import { ApiRepository } from '../Shared/ApiRepository';

@Injectable({
  providedIn: 'root',
})
export class ApiArtistRepository
  extends ApiRepository
  implements ArtistRepository
{
  private _API_URL = environment.apiUrl;

  public async find(uuid: string): Promise<Artist> {
    const url = `${this._API_URL}/artist/${uuid}`;
    const response = this.http.get<ArtistDTO>(url);

    const artistDto = await firstValueFrom(response);

    return new Artist(artistDto);
  }

  public async findAll(): Promise<Artist[]> {
    const url = `${this._API_URL}/artist/all`;
    const response = await this.http.get<ArtistDTO[]>(url);

    const artistsDto = await firstValueFrom(response);

    return artistsDto.map((artistDto) => new Artist(artistDto));
  }

  public async findEpisodes(uuid: string): Promise<PodcastEpisode[]> {
    const url = `${this._API_URL}/artist/${uuid}/episodes`;
    const response = this.http.get<PodcastEpisodeDTO[]>(url);

    const episodesDto = await firstValueFrom(response);

    return episodesDto.map((episodeDto) => new PodcastEpisode(episodeDto));
  }

  public async filter(
    query: ArtistQuery
  ): Promise<Paginated<Artist[], 'artists'>> {
    const url = `${this._API_URL}/artist/filter`;
    const response = this.http.post<Paginated<ArtistDTO[], 'artists'>>(
      url,
      query
    );

    const { artists: artistsDto, pages } = await firstValueFrom(response);
    const artists = artistsDto.map((artistDto) => new Artist(artistDto));

    return {
      artists,
      pages,
    };
  }
}
