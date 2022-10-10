import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddTontinePage } from './add-tontine.page';

const routes: Routes = [
  {
    path: '',
    component: AddTontinePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddTontinePageRoutingModule {}
