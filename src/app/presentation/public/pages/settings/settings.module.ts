import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { AuthComponentsModule } from 'src/app/presentation/shared/modules/auth-components/auth-components.module';

@NgModule({
  declarations: [SettingsComponent],
  imports: [CommonModule, SettingsRoutingModule, AuthComponentsModule],
})
export class SettingsModule {}
