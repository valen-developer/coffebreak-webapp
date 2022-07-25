import { Injectable } from '@angular/core';
import { EpisodeTrack } from 'src/app/domain/EpisodeTrack/EpisodeTrack.model';
import { EpisodeTrackRepository } from 'src/app/domain/EpisodeTrack/interfaces/EpisodeTrackRepository.interface';

@Injectable({
  providedIn: 'root',
})
export class EpisodeTrackFinder {
  constructor(private trackRepository: EpisodeTrackRepository) {}

  public async findByEpisode(episodeUuid: string): Promise<EpisodeTrack[]> {
    const episodeTracks = await this.trackRepository.findByEpisode(episodeUuid);

    return episodeTracks;
  }
}
