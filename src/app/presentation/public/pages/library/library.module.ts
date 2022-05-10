import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/presentation/shared/shared.module';
import { LibraryRoutingModule } from './library-routing.module';

import { LibraryComponent } from './library.component';
import { PlaylistComponent } from './pages/playlist/playlist.component';
import { LibraryNavbarComponent } from './components/library-navbar/library-navbar.component';
import { ArtistsComponent } from './pages/artists/artists.component';
import { RouteToolService } from 'src/app/presentation/shared/services/route-tool.service';

@NgModule({
  declarations: [
    LibraryComponent,
    PlaylistComponent,
    LibraryNavbarComponent,
    ArtistsComponent,
  ],
  imports: [CommonModule, LibraryRoutingModule, SharedModule],
})
export class LibraryModule {}
