import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateExrcicePageRoutingModule } from './update-exrcice-routing.module';

import { UpdateExrcicePage } from './update-exrcice.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateExrcicePageRoutingModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  declarations: [UpdateExrcicePage]
})
export class UpdateExrcicePageModule {}
