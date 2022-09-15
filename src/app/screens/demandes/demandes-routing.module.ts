import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DemandesPage } from './demandes.page';

const routes: Routes = [
  {
    path: '',
    component: DemandesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemandesPageRoutingModule {}
