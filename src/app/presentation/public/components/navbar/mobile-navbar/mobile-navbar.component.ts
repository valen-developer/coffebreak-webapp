import { Component, Input, OnInit } from '@angular/core';
import { Navbar, Route } from '../Navbar.interface';

@Component({
  selector: 'app-mobile-navbar',
  templateUrl: './mobile-navbar.component.html',
  styleUrls: ['./mobile-navbar.component.scss'],
})
export class MobileNavbarComponent implements OnInit, Navbar {
  @Input()
  public routes: Route[] = [];

  constructor() {}

  ngOnInit(): void {}
}
