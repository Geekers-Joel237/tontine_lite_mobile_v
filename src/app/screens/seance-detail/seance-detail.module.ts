import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeanceDetailPageRoutingModule } from './seance-detail-routing.module';

import { SeanceDetailPage } from './seance-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeanceDetailPageRoutingModule
  ],
  declarations: [SeanceDetailPage]
})
export class SeanceDetailPageModule {}
