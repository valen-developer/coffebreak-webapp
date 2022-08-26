import { Component, Input, OnInit } from '@angular/core';
import { EpisodeTimeTrackerStore } from 'src/app/application/EpisodeTimeTracker/EpisodeTimeTrackerStore.service';
import { EpisodeTimeTracker } from 'src/app/domain/EpisodeTimeTracker/EpisodeTimeTracker.model';
import { Nullable } from 'src/app/domain/Shared/types/Nullable.type';

@Component({
  selector: 'app-episode-card',
  templateUrl: './episode-card.component.html',
  styleUrls: ['./episode-card.component.scss'],
})
export class EpisodeCardComponent implements OnInit {
  @Input() public entity!: Entity;

  public timeTracker: Nullable<EpisodeTimeTracker>;

  constructor(private timeTrackerStore: EpisodeTimeTrackerStore) {}

  ngOnInit(): void {
    this.getTimeTracker();
  }

  public onError(event: ErrorEvent): void {
    const imageHtmlElement = event.target as HTMLImageElement;
    imageHtmlElement.src = 'assets/images/not-episode-image.png';
  }

  private getTimeTracker(): void {
    const { isEpisode } = this.entity;
    if (!isEpisode) return;

    this.timeTrackerStore.timeTrackers$.subscribe({
      next: (timeTrackers) => {
        this.timeTracker = timeTrackers.find((t) => {
          const isSame = t.episodeUuid.value === this.entity.uuid;
          return isSame;
        });
      },
    });
  }
}

export interface Entity {
  title: string;
  description: string;
  imageUrl: string;
  uuid?: string;
  isEpisode: boolean;
}
