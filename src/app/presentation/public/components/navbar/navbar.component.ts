import { Component, OnDestroy, OnInit } from '@angular/core';
import { debounceTime, Subscription } from 'rxjs';
import { DOMService } from 'src/app/presentation/shared/services/dom.service';
import { Navbar, Route, WebNavbarRouteSection } from './Navbar.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  public mobileRoutes: Route[] = [
    {
      iconClass: 'fas fa-home',
      path: '/home',
      label: 'Home',
    },
    {
      label: 'Explore',
      iconClass: 'fas fa-compass',
      path: '/explore',
    },
    {
      label: 'Library',
      iconClass: 'fas fa-file-audio',
      path: '/library',
    },
    {
      label: 'Settings',
      iconClass: 'fas fa-cog',
      path: '/settings',
    },
  ];
  public webRouteSections: WebNavbarRouteSection[] = [
    {
      label: 'Menú',
      routes: this.mobileRoutes,
    },
    {
      label: 'Opciones',
      routes: this.mobileRoutes,
    },
    {
      label: 'Opciones',
      routes: this.mobileRoutes,
    },
  ];

  public isMobile = true;
  private changeDimentionSubscription!: Subscription;

  constructor(private domService: DOMService) {}

  ngOnInit(): void {
    this.subscribeToChangeDimention();
    this.isMobile = this.domService.isMobile();
  }

  ngOnDestroy(): void {
    this.changeDimentionSubscription?.unsubscribe();
  }

  private subscribeToChangeDimention(): void {
    this.changeDimentionSubscription = this.domService.onChangeView$
      .pipe(debounceTime(300))
      .subscribe(() => {
        this.isMobile = this.domService.isMobile();
      });
  }
}
