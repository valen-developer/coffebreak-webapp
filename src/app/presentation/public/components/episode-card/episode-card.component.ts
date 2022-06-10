import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-episode-card',
  templateUrl: './episode-card.component.html',
  styleUrls: ['./episode-card.component.scss'],
})
export class EpisodeCardComponent implements OnInit {
  @Input() public entity!: Entity;

  constructor() {}

  ngOnInit(): void {}

  public onError(event: ErrorEvent): void {
    const imageHtmlElement = event.target as HTMLImageElement;
    imageHtmlElement.src = 'https://via.placeholder.com/150';
  }
}

export interface Entity {
  title: string;
  description: string;
  imageUrl: string;
  uuid?: string;
}
