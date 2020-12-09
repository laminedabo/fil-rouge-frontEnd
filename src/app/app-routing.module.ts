import { ListeUsersComponent } from './liste-users/liste-users.component';
import { ListeProfilComponent } from './liste-profil/liste-profil.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'login', component: ConnexionComponent},
  { path: 'profils', component: ListeProfilComponent },
  { path: 'users', component: ListeUsersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
