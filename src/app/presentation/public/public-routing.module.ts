import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PublicComponent } from './public.component';

import { ExploreComponent } from './pages/explore/explore.component';
import { HomeComponent } from './pages/home/home.component';
import { EpisodeComponent } from './pages/episode/episode.component';
import { PlaylistComponent } from './pages/playlist/playlist.component';
import { PlaylistOwnerGuard } from '../auth/guards/playlist-owner.guard';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'explore',
        component: ExploreComponent,
      },
      {
        path: 'episode/:uuid',
        component: EpisodeComponent,
      },
      {
        path: 'playlist/:uuid',
        component: PlaylistComponent,
        canActivate: [PlaylistOwnerGuard],
      },
      {
        path: 'library',
        loadChildren: () =>
          import('./pages/library/library.module').then((m) => m.LibraryModule),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./pages/settings/settings.module').then(
            (m) => m.SettingsModule
          ),
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'explore',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
