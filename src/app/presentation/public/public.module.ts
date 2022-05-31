import { CommonModule } from '@angular/common';
import {
  ApplicationRef,
  APP_INITIALIZER,
  DoBootstrap,
  NgModule,
} from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PublicRoutingModule } from './public-routing.module';

import { Router } from '@angular/router';
import { EpisodePlayerService } from '../shared/modules/audio-player/services/episode-player.service';
import { DOMService } from '../shared/services/dom.service';
import { RouteToolService } from '../shared/services/route-tool.service';
import { EpisodeCardListComponent } from './components/episode-card-list/episode-card-list.component';
import { EpisodeCardComponent } from './components/episode-card/episode-card.component';
import { MobileNavbarComponent } from './components/navbar/mobile-navbar/mobile-navbar.component';
import { NavbarLinkComponent } from './components/navbar/navbar-link/navbar-link.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WebNavbarComponent } from './components/navbar/web-navbar/web-navbar.component';
import { SearchResultEntityMoblieComponent } from './components/search-result-entity-moblie/search-result-entity-moblie.component';
import { EpisodeComponent } from './pages/episode/episode.component';
import { ExploreComponent } from './pages/explore/explore.component';
import { HomeComponent } from './pages/home/home.component';
import { PlaylistComponent } from './pages/playlist/playlist.component';
import { PublicComponent } from './public.component';
import { ScrollService } from '../shared/services/scroll.service';
import { PlaylistPlayerService } from '../shared/modules/audio-player/services/playlist-player.service';

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
    PlaylistComponent,
  ],
  imports: [CommonModule, PublicRoutingModule, SharedModule],
  providers: [
    PlaylistPlayerService,
    EpisodePlayerService,
    RouteToolService,
    ScrollService,
  ],
})
export class PublicModule {
  constructor(private routeTool: RouteToolService) {}
}
