import { Component, Input, OnInit } from '@angular/core';
import { Entity } from '../episode-card/episode-card.component';

@Component({
  selector: 'app-episode-card-list',
  templateUrl: './episode-card-list.component.html',
  styleUrls: ['./episode-card-list.component.scss'],
})
export class EpisodeCardListComponent implements OnInit {
  @Input()
  public entities: Entity[] = [];

  constructor() {}

  ngOnInit(): void {}
}
