import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddBeneficiairesPageRoutingModule } from './add-beneficiaires-routing.module';

import { AddBeneficiairesPage } from './add-beneficiaires.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddBeneficiairesPageRoutingModule,
    Ng2SearchPipeModule

  ],
  declarations: [AddBeneficiairesPage]
})
export class AddBeneficiairesPageModule {}
