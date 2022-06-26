import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from 'src/app/presentation/auth/guards/authentication.guard';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { MyAccountComponent } from './pages/my-account/my-account.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SettingsAppComponent } from './pages/settings-app/settings-app.component';
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
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'app',
        component: SettingsAppComponent,
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
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
