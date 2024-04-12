import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CommonModule, LocationStrategy,
  PathLocationStrategy
} from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {  Routes, RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FullComponent } from './layouts/full/full.component';


import { NavigationComponent } from './shared/header/navigation.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

import { Approutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './shared/spinner.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AddPostComponent } from './add-post/add-post.component';

import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { DetailsPostComponent } from './details-post/details-post.component';

import { DxSchedulerModule } from 'devextreme-angular';
import { ReservationPageComponent } from './reservation-page/reservation-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { IconsComponent } from './icons/icons.component';
import { UpdatePostComponent } from './update-post/update-post.component';
import { PostService } from './post.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UsersListComponent } from './users-list/users-list.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';

import { ResetPasswordRequestComponent } from './reset-password-request/reset-password-request.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { OtherUsersComponent } from './other-users/other-users.component';
import { ModalReclamationComponent } from './modal-reclamation/modal-reclamation.component';
import { ReservationArchivePageComponent } from './reservation-archive-page/reservation-archive-page.component';
import { FormreclamationComponent } from './formreclamation/formreclamation.component';
import { AdminComponent } from './dashboard/dashboard-components/admin/admin.component';
import { UserComponent } from './user/user.component';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';




const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 1,
  wheelPropagation: true,
  minScrollbarLength: 20
};

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    FullComponent,
    NavigationComponent,
    SidebarComponent,
    AddPostComponent,
    DetailsPostComponent,
    ReservationPageComponent,
    LoginComponent,
    RegisterComponent,
    IconsComponent,
    UpdatePostComponent,
    UserProfileComponent,
    UsersListComponent,
    ResetpasswordComponent,
    ResetPasswordRequestComponent,
    NotFoundComponent,
    OtherUsersComponent,
    ModalReclamationComponent,
    ReservationArchivePageComponent,
    FormreclamationComponent,
    UserComponent,
    ReservationFormComponent,
    ReservationListComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    DxSchedulerModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(Approutes, { useHash: false, relativeLinkResolution: 'legacy' }),
    PerfectScrollbarModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyDC4v9S9NjzctUncKo9nozQnngaCEUqs_o',
      libraries: ['places']
    }),
    FormsModule,


  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    },
    PostService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
