import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { AddAuctionComponent } from './components/Auction/add-auction/add-auction.component';
import { AuctionListComponent } from './components/Auction/auction-list/auction-list.component';
import { AddCompanyComponent } from './components/company/add-company/add-company.component';
import { CompanyListComponent } from './components/company/company-list/company-list.component';
import { AddCpoComponent } from './components/cpo/add-cpo/add-cpo.component';
import { CpoListComponent } from './components/cpo/cpo-list/cpo-list.component';
import { AddSampleComponent } from './components/Sample/add-sample/add-sample.component';
import { SampleListComponent } from './components/Sample/sample-list/sample-list.component';
import { AuthGuard } from './services/auth-guard.service';
import {UnauthorizedComponent} from'./components/unauthorized/unauthorized.component';
import { LoginComponent } from './components/Login/login/login.component';
import { RegistrationComponent } from './components/Registration/registration/registration.component';
import { ChangePasswordComponent } from './components/Registration/change-password/change-password.component';


const routes: Routes =[
  { path: '', redirectTo: '/login', pathMatch: 'full' },  // Default redirect to login
  { path: 'login', component: LoginComponent },

  { path: 'unauthorized', component: UnauthorizedComponent}, // Optional: Page when access is denied
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],  // Protect dashboard route
  },
  {
    path: 'add-cpo',
    component: AddCpoComponent,
    canActivate: [AuthGuard],
  }, 
 
 
  {
    path: 'add-cpo/:id',
    component: AddCpoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-company',
    component: AddCompanyComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-company/:id',
    component: AddCompanyComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'company-list',
    component: CompanyListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-sample',
    component: AddSampleComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-sample/:id',
    component: AddSampleComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'sample-list',
    component: SampleListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'cpo-list',
    component: CpoListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-auction',
    component: AddAuctionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'auction-list',
    component: AuctionListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-auction/:id',
    component: AddAuctionComponent,
    canActivate: [AuthGuard],
  },
  { path: 'notifications',  
    component: NotificationsComponent,
    canActivate: [AuthGuard],
   },
    { path: 'registration',  
      component: RegistrationComponent,
      canActivate: [AuthGuard],
     },
     { path: 'change-password',  
      component: ChangePasswordComponent,
      canActivate: [AuthGuard],
     },
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
