import { AccueilAdminComponent } from './public/accueil-admin/accueil-admin.component';
import { ListeGroupeCompetenceComponent } from './referentiel/groupe-competence/liste-groupe-competence/liste-groupe-competence.component';
import { ListeReferentielComponent } from './referentiel/liste-referentiel/liste-referentiel.component';
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
import { ReferentielResolver } from './Resolvers/referentiel.service';
import { GroupeCompetenceResolver } from './Resolvers/groupe-competence.service';
import { ListeCompetenceComponent } from './referentiel/groupe-competence/competence/liste-competence/liste-competence.component';
import { CompetenceResolver } from './Resolvers/competence.service';
import { ListeGroupetagsComponent } from './groupetags/liste-groupetags/groupetags.component';
import { GroupetagsResolver } from './Resolvers/groupetags.service';
import { ListeProfilSortieComponent } from './profilSortie/liste-profil-sortie/liste-profil-sortie.component';
import { ProfilsortieResolver } from './Resolvers/profilsortie.service';
import { AddReferentielComponent } from './referentiel/add-referentiel/add-referentiel.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { AddGroupeCompetenceComponent } from './referentiel/groupe-competence/add-groupe-competence/add-groupe-competence.component';
import { AddCompetenceComponent } from './referentiel/groupe-competence/competence/add-competence/add-competence.component';
import { DetailsReferentielComponent } from './referentiel/details-referentiel/details-referentiel.component';
import { DetailsGroupeCompetenceComponent } from './referentiel/groupe-competence/details-groupe-competence/details-groupe-competence.component';
import { DetailsCompetenceComponent } from './referentiel/groupe-competence/competence/details-competence/details-competence.component';
import { DetailsGroupetagsComponent } from './groupetags/details-groupetags/details-groupetags.component';
import { AddGroupetagsComponent } from './groupetags/add-groupetags/add-groupetags.component';
import { ProfilSortieDetailsComponent } from './profilSortie/profil-sortie-details/profil-sortie-details.component';
import { AddPromoComponent } from './promo/add-promo/add-promo.component';
import { DetailsPromoComponent } from './promo/details-promo/details-promo.component';

const routes: Routes = [
  {path: 'login', component: ConnexionComponent},
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  { path: 'admin', component: AppContainerComponent, canActivate: [AuthGuard], children:[
    { path: 'accueil', component: AccueilAdminComponent, canActivate: [AuthGuard]},
    {
      path:'', redirectTo: 'accueil', pathMatch: 'full'
    },
    { 
      path: 'users',
      canActivate: [AuthGuard],
      children: [
        { path: '', redirectTo: 'liste', pathMatch: 'full' },
        {
          path: 'liste',
          component: ListeUsersComponent,
          canActivate: [AuthGuard],
        },
        {
          path: 'add',
          component: AddUserComponent,
          canActivate: [AuthGuard],
        }
      ] 
    },
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
    { 
      path: 'promos',
      canActivate: [AuthGuard],
      children:[
        { path: '', redirectTo: 'liste', pathMatch: 'full' },
        {
          path: 'liste',
          component: ListePromoComponent,
          canActivate: [AuthGuard],
        },
        {
          path: 'add',
          component: AddPromoComponent,
          canActivate: [AuthGuard],
        },
        {
          path: ':id',
          component: DetailsPromoComponent,
          canActivate: [AuthGuard],
        }
      ] 
    },
    { 
      path: 'referentiels',
      canActivate: [AuthGuard],
      children:[
        {
          path: 'liste',
          component: ListeReferentielComponent,
          resolve: {
            referentiels: ReferentielResolver
          },
          canActivate: [AuthGuard],
        },
        { path: '', redirectTo: 'liste', pathMatch: 'full' },
        {
          path: 'add',
          component: AddReferentielComponent,
          canActivate: [AuthGuard],
        },
        {
          path: ':id',
          component: DetailsReferentielComponent,
          canActivate: [AuthGuard],
        },
      ]
    },
    {
      path: 'groupecompetences',
      canActivate: [AuthGuard],
      children: [
        { path: '', redirectTo: 'liste', pathMatch: 'full' },
        { 
          path: 'liste',
          component: ListeGroupeCompetenceComponent,
          resolve: {
            groupecompetences: GroupeCompetenceResolver
          }
        },
        {
          path: 'add',
          component: AddGroupeCompetenceComponent,
          canActivate: [AuthGuard],
        },
        {
          path: ':id',
          component: DetailsGroupeCompetenceComponent,
          canActivate: [AuthGuard],
        },
      ],
    },
    {
      path: 'competences',
      canActivate: [AuthGuard],
      children: [
        { path: '', redirectTo: 'liste', pathMatch: 'full' },
        { 
          path: 'liste',
          component: ListeCompetenceComponent,
          canActivate: [AuthGuard],
          resolve: {
            competences: CompetenceResolver
          }
        },
        {
          path: 'add',
          component: AddCompetenceComponent,
          canActivate: [AuthGuard],
        },
        {
          path: ':id',
          component: DetailsCompetenceComponent,
          canActivate: [AuthGuard],
        },
      ],
    },
    {
      path: 'groupetags',
      canActivate: [AuthGuard],
      children:[
        { path: '', redirectTo: 'liste', pathMatch: 'full' },
        {
          path: ':liste',
          component: ListeGroupetagsComponent,
          canActivate: [AuthGuard],
          resolve: {
            groupetags: GroupetagsResolver
          }
        },
        {
          path: 'add',
          component: AddGroupetagsComponent,
          canActivate: [AuthGuard],
        },
        {
          path: ':id',
          component: DetailsGroupetagsComponent,
          canActivate: [AuthGuard],
        },
      ]
    },
    {
      path: 'profilsorties',
      canActivate: [AuthGuard],
      children:[
        { path: '', redirectTo: 'liste', pathMatch: 'full' },
        { 
          path: 'liste',
          component: ListeProfilSortieComponent,
          resolve: {
            profilsorties: ProfilsortieResolver
          } 
        },
        {
          path: ':id',
          component: ProfilSortieDetailsComponent,
          canActivate: [AuthGuard],
        }
      ]
    },
  ]},
  

  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
