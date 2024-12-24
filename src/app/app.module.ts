import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, isDevMode } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { AddAuctionComponent } from './components/Auction/add-auction/add-auction.component';
import { AuctionListComponent } from './components/Auction/auction-list/auction-list.component';
import { AddCompanyComponent } from './components/company/add-company/add-company.component';
import { CompanyListComponent } from './components/company/company-list/company-list.component';
import { ConfirmationDialogComponent } from './components/confirmation/confirmation-dialog/confirmation-dialog.component';
import { AddCpoComponent } from './components/cpo/add-cpo/add-cpo.component';
import { CpoListComponent } from './components/cpo/cpo-list/cpo-list.component';
import { LoginComponent } from './components/Login/login/login.component';
import { RegistrationComponent } from './components/Registration/registration/registration.component';
import { AddSampleComponent } from './components/Sample/add-sample/add-sample.component';
import { SampleListComponent } from './components/Sample/sample-list/sample-list.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';  // Import MatCardModule
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AuthInterceptor } from './services/auth-interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { ChangePasswordComponent } from './components/Registration/change-password/change-password.component';
import { CapacitorSQLite, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { ItemsComponent } from './components/mobile/items/items.component';
import { ServiceWorkerModule } from '@angular/service-worker';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    RouterModule,
    AppRoutingModule,
    CommonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatSidenavModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatRadioModule,
    MatCardModule,
    NgxSpinnerModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    AddCpoComponent,
    CpoListComponent,
    AddCompanyComponent,
    CompanyListComponent,
    AddAuctionComponent,
    AuctionListComponent,
    AddSampleComponent,
    SampleListComponent,
    ConfirmationDialogComponent,
    LoginComponent,
    RegistrationComponent,
    UnauthorizedComponent,
    ChangePasswordComponent,
    ItemsComponent,
   
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
