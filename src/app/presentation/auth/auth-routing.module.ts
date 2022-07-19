import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { RrssErrorComponent } from './pages/rrss-error/rrss-error.component';
import { RrssSuccessComponent } from './pages/rrss-success/rrss-success.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'rrss/success',
        component: RrssSuccessComponent,
      },
      {
        path: 'rrss/failure',
        component: RrssErrorComponent,
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: '/rrss/failure',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
