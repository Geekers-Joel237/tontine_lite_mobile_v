import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateTontinePage } from './update-tontine.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateTontinePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateTontinePageRoutingModule {}
