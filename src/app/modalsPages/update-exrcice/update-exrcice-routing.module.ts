import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateExrcicePage } from './update-exrcice.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateExrcicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateExrcicePageRoutingModule {}
