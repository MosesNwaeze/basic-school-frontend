import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentPortalRoutingModule } from './student-portal-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ResultComponent } from './components/result/result.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ELearningComponent } from './components/e-learning/e-learning.component';
import { ClassInformationComponent } from './components/class-information/class-information.component';
import { NewUniformComponent } from './components/new-uniform/new-uniform.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { PaymentHistoryComponent } from './components/payment-history/payment-history.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ChangePasswordComponent,
    DashboardComponent,
    ResultComponent,
    PaymentsComponent,
    ProfileComponent,
    ELearningComponent,
    ClassInformationComponent,
    NewUniformComponent,
    StudentDashboardComponent,
    EditProfileComponent,
    PaymentHistoryComponent
  ],
  imports: [
    CommonModule,
    StudentPortalRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatCardModule
  ]
})
export class StudentPortalModule { }
