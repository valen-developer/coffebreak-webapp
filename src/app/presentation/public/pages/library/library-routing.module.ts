import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryComponent } from './library.component';
import { ArtistsComponent } from './pages/artists/artists.component';
import { PlaylistComponent } from './pages/playlist/playlist.component';

const routes: Routes = [
  {
    path: '',
    component: LibraryComponent,
    children: [
      { path: 'playlist', component: PlaylistComponent },
      { path: 'artists', component: ArtistsComponent },
      { path: '**', pathMatch: 'full', redirectTo: 'playlist' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibraryRoutingModule {}
