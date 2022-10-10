import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateTontinePageRoutingModule } from './update-tontine-routing.module';

import { UpdateTontinePage } from './update-tontine.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateTontinePageRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [UpdateTontinePage]
})
export class UpdateTontinePageModule {}
