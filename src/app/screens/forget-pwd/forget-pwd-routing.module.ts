import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgetPwdPage } from './forget-pwd.page';

const routes: Routes = [
  {
    path: '',
    component: ForgetPwdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgetPwdPageRoutingModule {}
