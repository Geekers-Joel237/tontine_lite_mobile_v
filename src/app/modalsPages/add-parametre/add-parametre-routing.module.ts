import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddParametrePage } from './add-parametre.page';

const routes: Routes = [
  {
    path: '',
    component: AddParametrePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddParametrePageRoutingModule {}
