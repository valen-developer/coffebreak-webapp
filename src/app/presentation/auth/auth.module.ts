import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { AuthComponentsModule } from '../shared/modules/auth-components/auth-components.module';
import { RrssSuccessComponent } from './pages/rrss-success/rrss-success.component';
import { RrssErrorComponent } from './pages/rrss-error/rrss-error.component';
import { RegisterComponent } from './pages/register/register.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RecoverPasswordComponent } from './pages/recover-password/recover-password.component';
import { ValidateComponent } from './pages/validate/validate.component';

@NgModule({
  declarations: [
    AuthComponent,
    RrssSuccessComponent,
    RrssErrorComponent,
    RegisterComponent,
    RecoverPasswordComponent,
    ValidateComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    AuthComponentsModule,
    SharedModule,
  ],
})
export class AuthModule {}
