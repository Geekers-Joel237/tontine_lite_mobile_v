import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MembreDetailPage } from './membre-detail.page';

const routes: Routes = [
  {
    path: '',
    component: MembreDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MembreDetailPageRoutingModule {}
