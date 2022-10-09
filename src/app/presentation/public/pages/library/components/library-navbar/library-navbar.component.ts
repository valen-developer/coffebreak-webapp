import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-library-navbar',
  templateUrl: './library-navbar.component.html',
  styleUrls: ['./library-navbar.component.scss'],
})
export class LibraryNavbarComponent implements OnInit {
  public routes: { label: string; path: string }[] = [
    {
      label: 'Playlists',
      path: '/library/playlist',
    },
    {
      label: 'Contertulios',
      path: '/library/artists',
    },
    {
      label: 'Ultimos escuchados',
      path: '/library/last-ear',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
