import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';

import { SettingsComponent } from './settings.component';
import { AuthComponentsModule } from 'src/app/presentation/shared/modules/auth-components/auth-components.module';
import { SettingsHomeComponent } from './pages/settings-home/settings-home.component';
import { SharedModule } from 'src/app/presentation/shared/shared.module';
import { MyAccountComponent } from './pages/my-account/my-account.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { EditProfileModalComponent } from './components/edit-profile-modal/edit-profile-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SettingsAppComponent } from './pages/settings-app/settings-app.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';

@NgModule({
  declarations: [
    SettingsComponent,
    SettingsHomeComponent,
    MyAccountComponent,
    ProfileComponent,
    EditProfileModalComponent,
    SettingsAppComponent,
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SettingsRoutingModule,
    AuthComponentsModule,
    SharedModule,
  ],
})
export class SettingsModule {}
