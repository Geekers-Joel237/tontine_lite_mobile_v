import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddExercicePage } from './add-exercice.page';

const routes: Routes = [
  {
    path: '',
    component: AddExercicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddExercicePageRoutingModule {}
