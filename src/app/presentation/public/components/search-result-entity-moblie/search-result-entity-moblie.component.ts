import { Component, Input, OnInit } from '@angular/core';
import { PodcastEpisode } from 'src/app/domain/PodcastEpisode/PodcastEpisode.model';

@Component({
  selector: 'app-search-result-entity-moblie',
  templateUrl: './search-result-entity-moblie.component.html',
  styleUrls: ['./search-result-entity-moblie.component.scss'],
})
export class SearchResultEntityMoblieComponent implements OnInit {
  @Input() public episodes!: PodcastEpisode;

  constructor() {}

  ngOnInit(): void {}
}
