import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TontinesPageRoutingModule } from './tontines-routing.module';

import { TontinesPage } from './tontines.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TontinesPageRoutingModule
  ],
  declarations: [TontinesPage]
})
export class TontinesPageModule {}
