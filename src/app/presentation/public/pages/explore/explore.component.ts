import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { debounceTime, fromEvent, Subscription } from 'rxjs';
import { PodcastEpisodeFinder } from 'src/app/application/PodcastEpisode/PodcastEpisodeFinder';
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
  private _THIS_URL = '/explore';

  private currentUrlSubscription!: Subscription;

  constructor(
    private episodeFinder: PodcastEpisodeFinder,
    private routeContainerScrollService: RouteContainerScrollService,
    private routeTool: RouteToolService
  ) {}

  ngAfterViewInit(): void {
    this.subscribeCurrentUrl();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.currentUrlSubscription?.unsubscribe();
  }

  public onSearch(query: string): void {
    if (!query) {
      this.episodes = [];
      return;
    }

    this.search(query);
  }

  private search(criteria: string): void {
    const query: PodcastEpisodeQuery = {
      title_contains: criteria,
    };

    const paginator: Paginator<PodcastEpisodeDTO> = {
      sort_by: 'pubDate',
      order: 'desc',
    };

    this.episodeFinder.filter(query, paginator).then((episodes) => {
      this.episodes = episodes;
    });
  }

  public onSuggest(query: string): void {
    this.search(query);
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
}
