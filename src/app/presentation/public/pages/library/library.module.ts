import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/presentation/shared/shared.module';
import { LibraryRoutingModule } from './library-routing.module';

import { LibraryNavbarComponent } from './components/library-navbar/library-navbar.component';
import { LibraryComponent } from './library.component';
import { ArtistsComponent } from './pages/artists/artists.component';
import { PlaylistComponent } from './pages/playlist/playlist.component';
import { AuthComponentsModule } from 'src/app/presentation/shared/modules/auth-components/auth-components.module';
import { CrearePlaylistModalComponent } from './components/creare-playlist-modal/creare-playlist-modal.component';

@NgModule({
  declarations: [
    LibraryComponent,
    PlaylistComponent,
    LibraryNavbarComponent,
    ArtistsComponent,
    CrearePlaylistModalComponent,
  ],
  imports: [
    CommonModule,
    LibraryRoutingModule,
    SharedModule,
    AuthComponentsModule,
  ],
})
export class LibraryModule {}
