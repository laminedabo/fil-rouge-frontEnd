import { HTTPInterceptorService } from './parametres/httpinterceptor.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListeProfilComponent } from './profil/liste-profil/liste-profil.component';
import { ListeUsersComponent } from './user/liste-users/liste-users.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
    AppContainerComponent
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

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HTTPInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
