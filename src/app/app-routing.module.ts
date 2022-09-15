import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./screens/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./screens/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'forget-pwd',
    loadChildren: () => import('./screens/forget-pwd/forget-pwd.module').then( m => m.ForgetPwdPageModule)
  },
  {
    path: 'add-tontine',
    loadChildren: () => import('./screens/add-tontine/add-tontine.module').then( m => m.AddTontinePageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./screens/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'tabs-menu',
    loadChildren: () => import('./screens/tabs-menu/tabs-menu.module').then( m => m.TabsMenuPageModule)
  },
  {
    path: 'tontine-detail/:id',
    loadChildren: () => import('./screens/tontine-detail/tontine-detail.module').then( m => m.TontineDetailPageModule)
  },
  // {
  //   path: 'tabs-menu/tontines',
  //   loadChildren: () => import('./screens/tontines/tontines.module').then( m => m.TontinesPageModule)
  // },
  // {
  //   path: 'tabs-menu/demandes',
  //   loadChildren: () => import('./screens/demandes/demandes.module').then( m => m.DemandesPageModule)
  // },
  // {
  //   path: 'tabs-menu/dashboard',
  //   loadChildren: () => import('./screens/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  // },
  // {
  //   path: 'tabs-menu/messages',
  //   loadChildren: () => import('./screens/messages/messages.module').then( m => m.MessagesPageModule)
  // },
  // {
  //   path: 'tabs-menu/parametres',
  //   loadChildren: () => import('./screens/parametres/parametres.module').then( m => m.ParametresPageModule)
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
