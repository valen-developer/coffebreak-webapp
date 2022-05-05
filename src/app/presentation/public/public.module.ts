import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MobileNavbarComponent } from './components/navbar/mobile-navbar/mobile-navbar.component';
import { WebNavbarComponent } from './components/navbar/web-navbar/web-navbar.component';
import { NavbarLinkComponent } from './components/navbar/navbar-link/navbar-link.component';

@NgModule({
  declarations: [
    PublicComponent,
    HomeComponent,
    NavbarComponent,
    MobileNavbarComponent,
    WebNavbarComponent,
    NavbarLinkComponent,
  ],
  imports: [CommonModule, PublicRoutingModule],
})
export class PublicModule {}
