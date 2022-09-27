import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeanceDetailPage } from './seance-detail.page';

const routes: Routes = [
  {
    path: '',
    component: SeanceDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeanceDetailPageRoutingModule {}
