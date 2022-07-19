import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { AuthComponentsModule } from '../shared/modules/auth-components/auth-components.module';
import { RrssSuccessComponent } from './pages/rrss-success/rrss-success.component';
import { RrssErrorComponent } from './pages/rrss-error/rrss-error.component';

@NgModule({
  declarations: [AuthComponent, RrssSuccessComponent, RrssErrorComponent],
  imports: [CommonModule, AuthRoutingModule, AuthComponentsModule],
})
export class AuthModule {}
