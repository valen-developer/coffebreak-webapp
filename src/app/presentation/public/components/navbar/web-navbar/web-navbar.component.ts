import { Component, Input, OnInit } from '@angular/core';
import { Navbar, Route, WebNavbarRouteSection } from '../Navbar.interface';

@Component({
  selector: 'app-web-navbar',
  templateUrl: './web-navbar.component.html',
  styleUrls: ['./web-navbar.component.scss'],
})
export class WebNavbarComponent implements OnInit, Navbar {
  @Input()
  public routeSections: WebNavbarRouteSection[] = [];

  constructor() {}

  ngOnInit(): void {}
}
