import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { AuthComponentsModule } from 'src/app/presentation/shared/modules/auth-components/auth-components.module';
import { SettingsHomeComponent } from './pages/settings-home/settings-home.component';
import { SharedModule } from 'src/app/presentation/shared/shared.module';

@NgModule({
  declarations: [SettingsComponent, SettingsHomeComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    AuthComponentsModule,
    SharedModule,
  ],
})
export class SettingsModule {}
