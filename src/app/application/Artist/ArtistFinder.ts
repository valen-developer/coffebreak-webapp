import { Injectable } from '@angular/core';
import { Artist, ArtistDTO } from 'src/app/domain/Artist/Artist.model';
import { ArtistQuery } from 'src/app/domain/Artist/ArtistQuery';
import { ArtistRepository } from 'src/app/domain/Artist/interfaces/ArtistRepository.interface';
import { PodcastEpisode } from 'src/app/domain/PodcastEpisode/PodcastEpisode.model';
import { Paginator } from 'src/app/domain/Shared/interfaces/Paginator.interface';
import { Paginated } from 'src/app/helpers/Paginated';
import { Union } from 'src/app/helpers/Union';

@Injectable({
  providedIn: 'root',
})
export class ArtistFinderService {
  constructor(private artistRepository: ArtistRepository) {}

  public async findAll(): Promise<Artist[]> {
    return this.artistRepository.findAll();
  }

  public async find(uuid: string): Promise<Artist> {
    return this.artistRepository.find(uuid);
  }

  public async findEpisodes(uuid: string): Promise<PodcastEpisode[]> {
    return this.artistRepository.findEpisodes(uuid);
  }

  public async filter(
    query: Union<ArtistQuery, Paginator<ArtistDTO>>
  ): Promise<Paginated<Artist[], 'artists'>> {
    return await this.artistRepository.filter(query);
  }
}
