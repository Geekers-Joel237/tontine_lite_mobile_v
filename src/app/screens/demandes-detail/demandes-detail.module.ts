import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DemandesDetailPageRoutingModule } from './demandes-detail-routing.module';

import { DemandesDetailPage } from './demandes-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DemandesDetailPageRoutingModule
  ],
  declarations: [DemandesDetailPage]
})
export class DemandesDetailPageModule {}
