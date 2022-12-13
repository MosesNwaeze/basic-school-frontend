import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalComponent } from './components/modal/modal.component';
import { HostingComponent } from './components/modal/hosting/hosting.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { EnrollToSchoolModule } from './modules/enroll-to-school/enroll-to-school.module';
import { HomeModule } from './modules/home/home.module';
import { CurriculumModule } from './modules/curriculum/curriculum.module';
import { MobileAppModule } from './modules/mobile-app/mobile-app.module';
import { StaffPortalModule } from './modules/staff-portal/staff-portal.module';
import { StudentPortalModule } from './modules/student-portal/student-portal.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { PaymentModule } from './modules/payment/payment.module';
import { AdminModule } from './modules/admin/admin.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    HostingComponent,
    FooterComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    EnrollToSchoolModule,
    HomeModule,
    CurriculumModule,
    MobileAppModule,
    StaffPortalModule,
    StudentPortalModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    PaymentModule,
    AdminModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
