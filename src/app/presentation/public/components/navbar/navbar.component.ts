import { Component, OnDestroy, OnInit } from '@angular/core';
import { debounceTime, Subscription } from 'rxjs';
import { DOMService } from 'src/app/presentation/shared/services/dom.service';
import { Navbar, Route } from './Navbar.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  public webRoutes: Route[] = [];
  public mobileRoutes: Route[] = [];
  private generalRoutes: Route[] = [];

  public isMobile = true;
  private changeDimentionSubscription!: Subscription;

  constructor(private domService: DOMService) {}

  ngOnInit(): void {
    this.subscribeToChangeDimention();
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
