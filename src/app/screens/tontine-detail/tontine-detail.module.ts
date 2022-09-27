import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { IonicModule } from '@ionic/angular';

import { TontineDetailPageRoutingModule } from './tontine-detail-routing.module';

import { TontineDetailPage } from './tontine-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TontineDetailPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [TontineDetailPage]
})
export class TontineDetailPageModule {}
