import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ArtistFinderService } from 'src/app/application/Artist/ArtistFinder';
import { PodcastEpisodeFinder } from 'src/app/application/PodcastEpisode/PodcastEpisodeFinder';
import { Artist, ArtistDTO } from 'src/app/domain/Artist/Artist.model';
import { ArtistQuery } from 'src/app/domain/Artist/ArtistQuery';
import {
  PodcastEpisode,
  PodcastEpisodeDTO,
} from 'src/app/domain/PodcastEpisode/PodcastEpisode.model';
import { PodcastEpisodeQuery } from 'src/app/domain/PodcastEpisode/PodcastEpisodeQuery';
import { Paginator } from 'src/app/domain/Shared/interfaces/Paginator.interface';
import { RouteToolService } from 'src/app/presentation/shared/services/route-tool.service';
import { RouteContainerScrollService } from '../../services/route-container-scroll.service';

@Component({
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
})
export class ExploreComponent implements OnInit, AfterViewInit, OnDestroy {
  public episodes: PodcastEpisode[] = [];
  public artists: Artist[] = [];

  public totalPagesEpisodes: number = 0;
  public currentPageEpisodes: number = 1;
  public currentEpisodeSearch: string = '';
  public currentDescriptionEpisode: string = '';

  public totalPagesArtists = 0;
  public currentPageArtists = 1;
  public currentArtistSearch = '';

  private _THIS_URL = '/explore';

  private currentUrlSubscription!: Subscription;

  constructor(
    private episodeFinder: PodcastEpisodeFinder,
    private artistFinder: ArtistFinderService,
    private routeContainerScrollService: RouteContainerScrollService,
    private routeTool: RouteToolService
  ) {}

  ngAfterViewInit(): void {
    this.subscribeCurrentUrl();
  }

  ngOnInit(): void {
    this.searchArtist();
  }

  ngOnDestroy(): void {
    this.currentUrlSubscription?.unsubscribe();
  }

  public onSearch(query: string): void {
    this.artists = [];
    this.episodes = [];

    this.currentPageEpisodes = 1;
    this.currentPageArtists = 1;

    this.currentEpisodeSearch = query;
    this.currentArtistSearch = query;
    this.currentDescriptionEpisode = '';

    if (!query) {
      this.currentArtistSearch = '';

      this.searchArtist();
      return;
    }

    this.searchEpisodes();
    this.searchArtist();
  }

  private searchEpisodes(query?: PodcastEpisodeQuery): void {
    const paginator: Paginator<PodcastEpisodeDTO> = {
      page: this.currentPageEpisodes,
      sort_by: 'pubDate',
      order: 'desc',
    };

    const queryBuilt: PodcastEpisodeQuery = query ?? {
      title_contains: this.currentEpisodeSearch,
      description_contains: this.currentDescriptionEpisode,
    };

    this.episodeFinder
      .filter(queryBuilt, paginator)
      .then(({ episodes, pages }) => {
        this.episodes = [...this.episodes, ...episodes];
        this.totalPagesEpisodes = pages;
      });
  }

  private searchArtist(): void {
    const query: ArtistQuery = {
      name_contains: this.currentArtistSearch,
    };

    const paginator: Paginator<ArtistDTO> = {
      page: this.currentPageArtists,
      sort_by: 'name',
      order: 'asc',
    };

    this.artistFinder
      .filter({ ...query, ...paginator })
      .then(({ artists, pages }) => {
        this.artists = [...this.artists, ...artists];
        this.totalPagesArtists = pages;
      });
  }

  public onSuggest(query: string): void {
    this.artists = [];
    this.episodes = [];
    this.totalPagesArtists = 0;
    this.currentPageArtists = 1;

    this.currentEpisodeSearch = query;
    this.currentDescriptionEpisode = '';
    this.currentPageEpisodes = 1;
    this.totalPagesEpisodes = 0;

    this.searchEpisodes();
  }

  public subscribeCurrentUrl(): void {
    const { currentUrl$ } = this.routeTool;

    this.currentUrlSubscription = currentUrl$.subscribe((url) => {
      const isSameUrl = url === this._THIS_URL;
      if (!isSameUrl) return;

      const scrollTo = this.routeContainerScrollService.getScrollTop(
        this._THIS_URL
      );
      if (!scrollTo) return;

      this.routeContainerScrollService.scrollTo(scrollTo);
    });
  }

  public searchByArtist(artist: Artist): void {
    this.artists = [artist];
    this.totalPagesArtists = 0;
    this.currentPageArtists = 1;

    this.currentEpisodeSearch = '';
    this.currentDescriptionEpisode = artist.name.value;
    this.totalPagesArtists = 0;

    this.searchEpisodes({
      description_contains: artist.name.value,
    });
  }

  public nextArtistPage(): void {
    const hasMorePages = this.hasMorePages(
      this.totalPagesArtists,
      this.currentPageArtists
    );

    if (!hasMorePages) return;

    this.currentPageArtists++;
    this.searchArtist();
  }

  public nextPageEpisodes(): void {
    const hasMorePages = this.hasMorePages(
      this.totalPagesEpisodes,
      this.currentPageEpisodes
    );

    if (!hasMorePages) return;

    this.currentPageEpisodes++;
    this.searchEpisodes();
  }

  public hasMorePages(total: number, current: number): boolean {
    return total > current;
  }
}
