import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-episode-card-list',
  templateUrl: './episode-card-list.component.html',
  styleUrls: ['./episode-card-list.component.scss'],
})
export class EpisodeCardListComponent implements OnInit {
  public entities = new Array(10).fill(0);

  constructor() {}

  ngOnInit(): void {}
}
