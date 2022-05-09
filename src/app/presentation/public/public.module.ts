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
import { ExploreComponent } from './pages/explore/explore.component';
import { SearchResultEntityMoblieComponent } from './components/search-result-entity-moblie/search-result-entity-moblie.component';
import { EpisodeComponent } from './pages/episode/episode.component';
import { EpisodePlayerService } from '../shared/modules/audio-player/services/episode-player.service';

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
    ExploreComponent,
    SearchResultEntityMoblieComponent,
    EpisodeComponent,
  ],
  imports: [CommonModule, PublicRoutingModule, SharedModule],
  providers: [EpisodePlayerService],
})
export class PublicModule {}
