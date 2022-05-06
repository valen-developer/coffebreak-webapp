import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
})
export class ExploreComponent implements OnInit {
  public entities = new Array(10).fill(0);

  constructor() {}

  ngOnInit(): void {}
}
