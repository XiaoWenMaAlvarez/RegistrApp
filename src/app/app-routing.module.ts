import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'profesor',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'estudiante',
    loadChildren: () => import('./pages/tabs-estudiante/tabs-estudiante.module').then( m => m.TabsEstudiantePageModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'olvidar-pass',
    loadChildren: () => import('./pages/olvidar-pass/olvidar-pass.module').then( m => m.OlvidarPassPageModule)
  },
  {
    path: 'pass-restablecido',
    loadChildren: () => import('./pages/pass-restablecido/pass-restablecido.module').then( m => m.PassRestablecidoPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/pagina404/pagina404.module').then( m => m.Pagina404PageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
