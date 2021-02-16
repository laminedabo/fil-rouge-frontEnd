import { HTTPInterceptorService } from './parametres/httpinterceptor.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatPaginatorIntl} from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxFileDropModule } from 'ngx-file-drop'
import {DragDropModule} from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListeProfilComponent } from './profil/liste-profil/liste-profil.component';
import { ListeUsersComponent } from './user/liste-users/liste-users.component';
import { MaterialModule } from './material/material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConnexionComponent } from './connexion/connexion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddUserComponent } from './user/add-user/add-user.component';
import { NavbarComponent } from './public/navbar/navbar.component';
import { DialogComponent } from './public/dialog/dialog.component';
import { UserDialogComponent } from './user/user-dialog/user-dialog.component';
import { ProfilDetailsComponent } from './profil/profil-details/profil-details.component';
import { ProfilComponent } from './profil/profil/profil.component';
import { NotFoundComponent } from './public/not-found/not-found.component';
import { PaginationComponent } from './public/pagination/pagination.component';
import { ListePromoComponent } from './promo/liste-promo/liste-promo.component';
import { AppContainerComponent } from './public/app-container/app-container.component';
import { ListeReferentielComponent } from './referentiel/liste-referentiel/liste-referentiel.component';
import { AddReferentielComponent } from './referentiel/add-referentiel/add-referentiel.component';
import { ListeGroupeCompetenceComponent } from './referentiel/groupe-competence/liste-groupe-competence/liste-groupe-competence.component';
import { AddGroupeCompetenceComponent } from './referentiel/groupe-competence/add-groupe-competence/add-groupe-competence.component';
import { AddCompetenceComponent } from './referentiel/groupe-competence/competence/add-competence/add-competence.component';
import { ListeCompetenceComponent } from './referentiel/groupe-competence/competence/liste-competence/liste-competence.component';
import { ListeProfilSortieComponent } from './profilSortie/liste-profil-sortie/liste-profil-sortie.component';
import { ProfilSortieDetailsComponent } from './profilSortie/profil-sortie-details/profil-sortie-details.component';
import { DetailsCompetenceComponent } from './referentiel/groupe-competence/competence/details-competence/details-competence.component';
import { DetailsGroupeCompetenceComponent } from './referentiel/groupe-competence/details-groupe-competence/details-groupe-competence.component';
import { DetailsReferentielComponent } from './referentiel/details-referentiel/details-referentiel.component';
import { CommonCardComponent } from './public/common-card/common-card.component';
import { DetailsPromoComponent } from './promo/details-promo/details-promo.component';
import { ListeGroupetagsComponent } from './groupetags/liste-groupetags/groupetags.component';
import { DetailsGroupetagsComponent } from './groupetags/details-groupetags/details-groupetags.component';
import { AddGroupetagsComponent } from './groupetags/add-groupetags/add-groupetags.component';
import { ListeApprenantComponent } from './apprenant/liste-apprenant/liste-apprenant.component';
import { DetailsApprenantComponent } from './apprenant/details-apprenant/details-apprenant.component';
import { ListeGroupeComponent } from './groupe/liste-groupe/liste-groupe.component';
import { DetailsGroupeComponent } from './groupe/details-groupe/details-groupe.component';
import { JumbotronComponent } from './public/jumbotron/jumbotron.component';
import { AccueilAdminComponent } from './public/accueil-admin/accueil-admin.component';
import { AddPromoComponent } from './promo/add-promo/add-promo.component';
import {CustomMatPaginatorIntl} from './parametres/custom-mat-paginator-intl.service';
import { CompetenceNiveauComponent } from './referentiel/competence-niveau/competence-niveau.component';
import { ListeBriefComponent } from './brief/liste-brief/liste-brief.component';
import { AddBriefComponent } from './brief/add-brief/add-brief.component';
import { DetailsBriefComponent } from './brief/details-brief/details-brief.component';

@NgModule({
  declarations: [
    AppComponent,
    ListeProfilComponent,
    ListeUsersComponent,
    ConnexionComponent,
    AddUserComponent,
    NavbarComponent,
    DialogComponent,
    UserDialogComponent,
    ProfilDetailsComponent,
    ProfilComponent,
    NotFoundComponent,
    PaginationComponent,
    ListePromoComponent,
    AppContainerComponent,
    ListeReferentielComponent,
    AddReferentielComponent,
    ListeGroupeCompetenceComponent,
    AddGroupeCompetenceComponent,
    AddCompetenceComponent,
    ListeCompetenceComponent,
    ListeProfilSortieComponent,
    ProfilSortieDetailsComponent,
    DetailsCompetenceComponent,
    DetailsGroupeCompetenceComponent,
    DetailsReferentielComponent,
    CommonCardComponent,
    DetailsPromoComponent,
    ListeGroupetagsComponent,
    DetailsGroupetagsComponent,
    AddGroupetagsComponent,
    ListeApprenantComponent,
    DetailsApprenantComponent,
    ListeGroupeComponent,
    DetailsGroupeComponent,
    JumbotronComponent,
    AccueilAdminComponent,
    AddPromoComponent,
    CompetenceNiveauComponent,
    ListeBriefComponent,
    AddBriefComponent,
    DetailsBriefComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    FlexLayoutModule,
    NgxFileDropModule,
    DragDropModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HTTPInterceptorService, multi: true},
    {provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
