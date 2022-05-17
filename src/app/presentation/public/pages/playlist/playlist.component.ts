import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlaylistFinder } from 'src/app/application/Playlist/PlaylistFinder';
import { ImageGetter } from 'src/app/application/Shared/ImageGetter';
import { Playlist } from 'src/app/domain/Playlist/Playlist.model';
import { PodcastEpisode } from 'src/app/domain/PodcastEpisode/PodcastEpisode.model';
import { PodcastDuration } from 'src/app/domain/PodcastEpisode/valueObjects/PodcastDuration.valueObject';
import { RouteToolService } from 'src/app/presentation/shared/services/route-tool.service';
import { ScrollService } from 'src/app/presentation/shared/services/scroll.service';

@Component({
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
})
export class PlaylistComponent implements OnInit {
  public episodes: PodcastEpisode[] = [];
  public playlist!: Playlist;

  public imageUrl!: string;
  public durationSeconds!: PodcastDuration;

  public previousUrl = '/';

  constructor(
    private route: ActivatedRoute,
    private routeTool: RouteToolService,
    private scrollService: ScrollService,
    private playlistFinder: PlaylistFinder,
    private imageGetter: ImageGetter
  ) {}

  ngOnInit(): void {
    this.scrollService.scrollToTop();
    this.previousUrl = this.routeTool.getPreviousUrl();
    const uuid = this.getUuid();

    if (!uuid) {
      this.routeTool.redirectTo('/');
    }

    this.getPlaylist(uuid);
    this.getImage(uuid);
  }

  private getUuid(): string {
    return this.route.snapshot.paramMap.get('uuid') ?? '';
  }

  private async getPlaylist(uuid: string): Promise<void> {
    const playlist = await this.playlistFinder.getPlaylist(uuid);
    const episodes = await this.playlistFinder.getEpisodes(uuid);

    this.playlist = playlist;
    this.episodes = episodes;

    this.calculateDurationSeconds();
  }

  private async getImage(uuid: string): Promise<void> {
    const image = await this.imageGetter.getDataUrlFromEntity(uuid);
    this.imageUrl = image;
  }

  private calculateDurationSeconds(): void {
    const seconds = this.episodes.reduce((acc, curr) => {
      return acc + curr.duration.value;
    }, 0);

    this.durationSeconds = new PodcastDuration(seconds);
  }
}
