import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PodcastEpisodeFinder } from 'src/app/application/PodcastEpisode/PodcastEpisodeFinder';
import { Playlist } from 'src/app/domain/Playlist/Playlist.model';
import { PodcastEpisode } from 'src/app/domain/PodcastEpisode/PodcastEpisode.model';
import { PodcastEpisodeQuery } from 'src/app/domain/PodcastEpisode/PodcastEpisodeQuery';
import { EpisodePlayerService } from 'src/app/presentation/shared/modules/audio-player/services/episode-player.service';
import { NavbarAudioController } from 'src/app/presentation/shared/modules/audio-player/services/navbar-audio-controller.service';
import { PlaylistPlayerService } from 'src/app/presentation/shared/modules/audio-player/services/playlist-player.service';
import { RouteToolService } from 'src/app/presentation/shared/services/route-tool.service';

@Component({
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.scss'],
})
export class EpisodeComponent implements OnInit, OnDestroy {
  public episode!: PodcastEpisode;
  public playlist!: Playlist;

  public episodePlaylistIndex$: Observable<number>;

  public previousUrl!: Observable<string>;

  constructor(
    private route: ActivatedRoute,
    private navbarAudioController: NavbarAudioController,
    private episodePlayerService: EpisodePlayerService,
    private episodeFinder: PodcastEpisodeFinder,
    private playlistPlayer: PlaylistPlayerService,
    private routeTool: RouteToolService
  ) {
    this.episodePlaylistIndex$ = this.playlistPlayer.episodeIndex$;
    this.previousUrl = this.routeTool.previousUrl$;
  }

  ngOnInit(): void {
    this.navbarAudioController.hide();

    const query: PodcastEpisodeQuery = {
      uuid_equals: this.getUuid(),
    };

    this.episodeFinder.filter(query, {}).then((episodeArray) => {
      const episode = episodeArray[0];
      this.episode = episode;
      this.episodePlayerService.setEpisode(episode);
    });
  }

  ngOnDestroy(): void {
    this.navbarAudioController.show();
  }

  private getUuid(): string {
    return this.route.snapshot.paramMap.get('uuid') as string;
  }

  public isPlaylist(): boolean {
    this.playlist = this.playlistPlayer.getPlaylist();

    return this.episodePlayerService.isPlaylist();
  }

  public onNext(): void {
    if (!this.isPlaylist()) return;

    this.playlistPlayer.nextEpisode();

    this.episode = this.playlistPlayer.getSelectedEpisode();
  }

  public onPrevious(): void {
    if (!this.isPlaylist()) return;

    this.playlistPlayer.previousEpisode();

    this.episode = this.playlistPlayer.getSelectedEpisode();
  }

  public onRandom(): void {}
}
