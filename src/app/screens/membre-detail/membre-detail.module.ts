import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MembreDetailPageRoutingModule } from './membre-detail-routing.module';

import { MembreDetailPage } from './membre-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MembreDetailPageRoutingModule
  ],
  declarations: [MembreDetailPage]
})
export class MembreDetailPageModule {}
