import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddParametrePageRoutingModule } from './add-parametre-routing.module';

import { AddParametrePage } from './add-parametre.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddParametrePageRoutingModule
  ],
  declarations: [AddParametrePage]
})
export class AddParametrePageModule {}
