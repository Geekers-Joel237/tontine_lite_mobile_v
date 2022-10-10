import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddBeneficiairesPage } from './add-beneficiaires.page';

const routes: Routes = [
  {
    path: '',
    component: AddBeneficiairesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddBeneficiairesPageRoutingModule {}
