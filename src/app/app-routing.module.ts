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
    loadChildren: () => import('./modalsPages/add-tontine/add-tontine.module').then( m => m.AddTontinePageModule)
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
  {
    path: 'demandes-detail',
    loadChildren: () => import('./screens/demandes-detail/demandes-detail.module').then( m => m.DemandesDetailPageModule)
  },
  {
    path: 'exercice-detail/:id/:rank',
    loadChildren: () => import('./screens/exercice-detail/exercice-detail.module').then( m => m.ExerciceDetailPageModule)
  },
  {
    path: 'seance-detail/:id/:rank',
    loadChildren: () => import('./screens/seance-detail/seance-detail.module').then( m => m.SeanceDetailPageModule)
  },
  {
    path: 'add-exercice',
    loadChildren: () => import('./modalsPages/add-exercice/add-exercice.module').then( m => m.AddExercicePageModule)
  },
  {
    path: 'update-tontine',
    loadChildren: () => import('./modalsPages/update-tontine/update-tontine.module').then( m => m.UpdateTontinePageModule)
  },
  {
    path: 'update-exrcice',
    loadChildren: () => import('./modalsPages/update-exrcice/update-exrcice.module').then( m => m.UpdateExrcicePageModule)
  },
  {
    path: 'membre-detail',
    loadChildren: () => import('./screens/membre-detail/membre-detail.module').then( m => m.MembreDetailPageModule)
  },
  {
    path: 'add-parametre',
    loadChildren: () => import('./modalsPages/add-parametre/add-parametre.module').then( m => m.AddParametrePageModule)
  },
  {
    path: 'add-beneficiaires',
    loadChildren: () => import('./modalsPages/add-beneficiaires/add-beneficiaires.module').then( m => m.AddBeneficiairesPageModule)
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
