import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TontinesPage } from './tontines.page';

const routes: Routes = [
  {
    path: '',
    component: TontinesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TontinesPageRoutingModule {}
