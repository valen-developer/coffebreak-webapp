import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EpisodeTimeTrackerStore } from 'src/app/application/EpisodeTimeTracker/EpisodeTimeTrackerStore.service';
import { EpisodeTimeTracker } from 'src/app/domain/EpisodeTimeTracker/EpisodeTimeTracker.model';
import { PodcastEpisode } from 'src/app/domain/PodcastEpisode/PodcastEpisode.model';
import { Nullable } from 'src/app/domain/Shared/types/Nullable.type';

@Component({
  selector: 'app-search-result-entity-moblie',
  templateUrl: './search-result-entity-moblie.component.html',
  styleUrls: ['./search-result-entity-moblie.component.scss'],
})
export class SearchResultEntityMoblieComponent implements OnInit, OnDestroy {
  @Input() public episode!: PodcastEpisode;

  private timeTrackerSubscription!: Subscription;
  public timeTracker: Nullable<EpisodeTimeTracker>;

  constructor(private timeTrackerStore: EpisodeTimeTrackerStore) {}

  ngOnInit(): void {
    this.subcribeTimeTracker();
  }

  ngOnDestroy(): void {
    this.timeTrackerSubscription?.unsubscribe();
  }

  private subcribeTimeTracker(): void {
    this.timeTrackerStore.timeTrackers$.subscribe({
      next: (timeTrackers) => {
        this.timeTracker = timeTrackers.find((t) => {
          const isSame = t.episodeUuid.value === this.episode.uuid.value;
          return isSame;
        });
      },
    });
  }
}
