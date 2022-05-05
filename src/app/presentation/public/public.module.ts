import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MobileNavbarComponent } from './components/navbar/mobile-navbar/mobile-navbar.component';
import { WebNavbarComponent } from './components/navbar/web-navbar/web-navbar.component';

@NgModule({
  declarations: [
    PublicComponent,
    HomeComponent,
    NavbarComponent,
    MobileNavbarComponent,
    WebNavbarComponent,
  ],
  imports: [CommonModule, PublicRoutingModule],
})
export class PublicModule {}
