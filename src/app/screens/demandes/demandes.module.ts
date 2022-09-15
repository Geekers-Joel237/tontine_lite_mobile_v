import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DemandesPageRoutingModule } from './demandes-routing.module';

import { DemandesPage } from './demandes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DemandesPageRoutingModule
  ],
  declarations: [DemandesPage]
})
export class DemandesPageModule {}
