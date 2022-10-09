import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LastEarComponent } from './last-ear.component';

const routes: Routes = [{ path: '', component: LastEarComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LastEarRoutingModule { }
