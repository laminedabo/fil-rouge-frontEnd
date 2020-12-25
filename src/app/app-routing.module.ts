import { ListePromoComponent } from './promo/liste-promo/liste-promo.component';
import { NotFoundComponent } from './public/not-found/not-found.component';
import { ListeUsersComponent } from './user/liste-users/liste-users.component';
import { ListeProfilComponent } from './profil/liste-profil/liste-profil.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { AuthGuardService as AuthGuard } from './parametres/auth-guard.service'
import { ProfilDetailsComponent } from './profil/profil-details/profil-details.component';
import { AppContainerComponent } from './public/app-container/app-container.component';

const routes: Routes = [
  {path: 'login', component: ConnexionComponent},
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: AppContainerComponent, canActivate: [AuthGuard], children:[
    {
      path:'', redirectTo: 'users', pathMatch: 'full'
    },
    { path: 'users', component: ListeUsersComponent, canActivate: [AuthGuard] },
    {
      path: 'profils',
      component: ListeProfilComponent, canActivate: [AuthGuard],
    },
    { 
      path: 'profils/:id',
      canActivate: [AuthGuard], 
      children: [
        {
          path: 'users',
          component: ProfilDetailsComponent, canActivate: [AuthGuard],
        }
      ]
    },
    { path: 'promos', component: ListePromoComponent, canActivate: [AuthGuard] },
  ] },
  

  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
