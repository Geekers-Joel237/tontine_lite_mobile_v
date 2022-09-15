import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TontineDetailPage } from './tontine-detail.page';

const routes: Routes = [
  {
    path: '',
    component: TontineDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TontineDetailPageRoutingModule {}
