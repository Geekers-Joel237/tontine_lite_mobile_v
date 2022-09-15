import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsMenuPageRoutingModule } from './tabs-menu-routing.module';

import { TabsMenuPage } from './tabs-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsMenuPageRoutingModule
  ],
  declarations: [TabsMenuPage]
})
export class TabsMenuPageModule {}
