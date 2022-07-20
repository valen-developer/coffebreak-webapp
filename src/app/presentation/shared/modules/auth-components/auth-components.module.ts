import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SharedModule } from '../../shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, SharedModule],
  exports: [LoginPageComponent],
})
export class AuthComponentsModule {}
