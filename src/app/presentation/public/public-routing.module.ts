import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PublicComponent } from './public.component';

import { ExploreComponent } from './pages/explore/explore.component';
import { HomeComponent } from './pages/home/home.component';

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
        path: 'library',
        loadChildren: () =>
          import('./pages/library/library.module').then((m) => m.LibraryModule),
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
