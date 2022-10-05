import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExerciceDetailPageRoutingModule } from './exercice-detail-routing.module';

import { ExerciceDetailPage } from './exercice-detail.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExerciceDetailPageRoutingModule,
    Ng2SearchPipeModule

  ],
  declarations: [ExerciceDetailPage]
})
export class ExerciceDetailPageModule {}
