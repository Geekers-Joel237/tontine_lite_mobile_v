import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExerciceDetailPage } from './exercice-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ExerciceDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExerciceDetailPageRoutingModule {}
