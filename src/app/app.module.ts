import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { httpInterceptorProviders } from './auth/auth-interceptor';
import { LoginComponent } from './auth/login/login.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { RoleListComponent } from './roles/role-list/role-list.component';
import { RoleAddComponent } from './roles/role-add/role-add.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserAddComponent } from './users/user-add/user-add.component';
import { NavComponent } from './layouts/nav/nav.component';
import { ProfileComponent } from './users/profile/profile.component';
import { AdminToolsComponent } from './admin-tools/admin-tools.component';
import { HotelListComponent } from './hotels/hotel-list/hotel-list.component';
import { HotelAddComponent } from './hotels/hotel-add/hotel-add.component';
import { ChamberAddComponent } from './chambers/chamber-add/chamber-add.component';
import { ChamberListComponent } from './chambers/chamber-list/chamber-list.component';
import { AccueilComponent } from './guest/accueil/accueil.component';
import { ReservationAddComponent } from './reservations/reservation-add/reservation-add.component';
import { ReservationListComponent } from './reservations/reservation-list/reservation-list.component';
import { ClientListComponent } from './clients/client-list/client-list.component';
import { ReservateComponent } from './guest/reservate/reservate.component';

export function HttpLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HomeLayoutComponent,
    AuthLayoutComponent,
    RoleListComponent,
    RoleAddComponent,
    UserListComponent,
    UserAddComponent,
    NavComponent,
    ProfileComponent,
    AdminToolsComponent,
    HotelListComponent,
    HotelAddComponent,
    ChamberAddComponent,
    ChamberListComponent,
    AccueilComponent,
    ReservationAddComponent,
    ReservationListComponent,
    ClientListComponent,
    ReservateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularMultiSelectModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
