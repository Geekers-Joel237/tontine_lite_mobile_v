import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsMenuPage } from './tabs-menu.page';

const routes: Routes = [
  {
    path: '',
    component: TabsMenuPage,
    children:[
      {
        path: 'tontines',
        loadChildren: () => import('../../screens/tontines/tontines.module').then( m => m.TontinesPageModule)
      },
      {
        path: 'demandes',
        loadChildren: () => import('../../screens/demandes/demandes.module').then( m => m.DemandesPageModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('../../screens/dashboard/dashboard.module').then( m => m.DashboardPageModule)
      },
      {
        path: 'messages',
        loadChildren: () => import('../../screens/messages/messages.module').then( m => m.MessagesPageModule)
      },
      {
        path: 'parametres',
        loadChildren: () => import('../../screens/parametres/parametres.module').then( m => m.ParametresPageModule)
      },
    ]
  },
  {
    path:'',
    redirectTo:'/tabs-menu/tontines',
    pathMatch:'full'

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsMenuPageRoutingModule {}
