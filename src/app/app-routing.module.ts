import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { RoleListComponent } from './roles/role-list/role-list.component';
import { RoleAddComponent } from './roles/role-add/role-add.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserAddComponent } from './users/user-add/user-add.component';
import { ProfileComponent } from './users/profile/profile.component';
import { NavComponent } from './layouts/nav/nav.component';
import { AdminToolsComponent } from './admin-tools/admin-tools.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'nav', component: NavComponent }
    ]
  },
  {
    path: '',
    component: NavComponent,
    children: [
      {
          path: 'home',
          component: HomeComponent,
          canActivate: [AuthGuard]
      },
      {
          path: 'admin-tools',
          component: AdminToolsComponent,
          canActivate: [AuthGuard]
      },
      {
          path: 'signup',
          component: RegisterComponent,
          canActivate: [AuthGuard]
      },
      {
          path: 'profile',
          component: ProfileComponent,
          canActivate: [AuthGuard]
      },
      {
          path: 'roles/list',
          component: RoleListComponent,
          canActivate: [AuthGuard]
      },
      {
          path: 'roles/add',
          component: RoleAddComponent,
          canActivate: [AuthGuard]
      },
      {
          path: 'roles/:id',
          component: RoleAddComponent,
          canActivate: [AuthGuard]
      },
      {
          path: 'users/list',
          component: UserListComponent,
          canActivate: [AuthGuard]
      },
      {
          path: 'users/add',
          component: UserAddComponent,
          canActivate: [AuthGuard]
      },
      {
          path: 'users/:id',
          component: UserAddComponent,
          canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
