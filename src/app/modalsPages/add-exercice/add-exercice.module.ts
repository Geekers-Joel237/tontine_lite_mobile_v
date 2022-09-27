import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddExercicePageRoutingModule } from './add-exercice-routing.module';

import { AddExercicePage } from './add-exercice.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddExercicePageRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [AddExercicePage]
})
export class AddExercicePageModule {}
