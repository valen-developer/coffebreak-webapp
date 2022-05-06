import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { PublicRoutingModule } from './public-routing.module';

import { PublicComponent } from './public.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MobileNavbarComponent } from './components/navbar/mobile-navbar/mobile-navbar.component';
import { WebNavbarComponent } from './components/navbar/web-navbar/web-navbar.component';
import { NavbarLinkComponent } from './components/navbar/navbar-link/navbar-link.component';
import { EpisodeCardComponent } from './components/episode-card/episode-card.component';
import { EpisodeCardListComponent } from './components/episode-card-list/episode-card-list.component';

@NgModule({
  declarations: [
    PublicComponent,
    HomeComponent,
    NavbarComponent,
    MobileNavbarComponent,
    WebNavbarComponent,
    NavbarLinkComponent,
    EpisodeCardComponent,
    EpisodeCardListComponent,
  ],
  imports: [CommonModule, PublicRoutingModule, SharedModule],
})
export class PublicModule {}
