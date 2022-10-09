import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LastEarRoutingModule } from './last-ear-routing.module';
import { LastEarComponent } from './last-ear.component';
import { PublicModule } from 'src/app/presentation/public/public.module';

@NgModule({
  declarations: [LastEarComponent],
  imports: [CommonModule, LastEarRoutingModule, PublicModule],
})
export class LastEarModule {}
