import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TontineDetailPageRoutingModule } from './tontine-detail-routing.module';

import { TontineDetailPage } from './tontine-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TontineDetailPageRoutingModule
  ],
  declarations: [TontineDetailPage]
})
export class TontineDetailPageModule {}
