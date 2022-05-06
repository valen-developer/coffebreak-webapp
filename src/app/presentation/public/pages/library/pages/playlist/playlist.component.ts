import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
})
export class PlaylistComponent implements OnInit {
  public platyLists = new Array(10).fill(0);

  constructor() {}

  ngOnInit(): void {}
}
