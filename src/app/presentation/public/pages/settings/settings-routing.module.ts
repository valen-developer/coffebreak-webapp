import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from 'src/app/presentation/auth/guards/authentication.guard';
import { MyAccountComponent } from './pages/my-account/my-account.component';
import { SettingsHomeComponent } from './pages/settings-home/settings-home.component';
import { SettingsComponent } from './settings.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      {
        path: '',
        component: SettingsHomeComponent,
      },
      {
        path: 'my-account',
        component: MyAccountComponent,
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
