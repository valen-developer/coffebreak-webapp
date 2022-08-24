import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { providers } from './providers';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AlertModule } from './presentation/shared/modules/alert/alert.module';
import { RouteReuseStrategy } from '@angular/router';
import { CustomReuseStrategy } from './infrastructure/Shared/CustomReuseStrategy';
import {
  NgxGoogleAnalyticsModule,
  NgxGoogleAnalyticsRouterModule,
} from 'ngx-google-analytics';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    AlertModule,
    NgxGoogleAnalyticsModule.forRoot('G-F3830WZ0F4'),
    NgxGoogleAnalyticsRouterModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [
    ...providers,
    {
      provide: RouteReuseStrategy,
      useClass: CustomReuseStrategy,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
