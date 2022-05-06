import { Component, Input, OnInit } from '@angular/core';
import { Route } from '../Navbar.interface';

@Component({
  selector: 'app-navbar-link',
  templateUrl: './navbar-link.component.html',
  styleUrls: ['./navbar-link.component.scss'],
})
export class NavbarLinkComponent implements OnInit {
  @Input() public route!: Route;
  @Input() public isMobile = true;

  constructor() {}

  ngOnInit(): void {}
}
