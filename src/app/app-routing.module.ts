import { ListeUsersComponent } from './user/liste-users/liste-users.component';
import { ListeProfilComponent } from './profil/liste-profil/liste-profil.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { AppComponent } from './app.component';
import { AuthGuardService as AuthGuard } from './parametres/auth-guard.service'

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'login', component: ConnexionComponent},
  { path: 'profils', component: ListeProfilComponent, canActivate: [AuthGuard] },
  { path: 'users', component: ListeUsersComponent, canActivate: [AuthGuard] },
  { path: 'accueil', component: ListeUsersComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
