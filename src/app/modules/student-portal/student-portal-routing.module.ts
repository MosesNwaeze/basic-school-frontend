import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ClassInformationComponent } from './components/class-information/class-information.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ELearningComponent } from './components/e-learning/e-learning.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { LoginComponent } from './components/login/login.component';
import { NewUniformComponent } from './components/new-uniform/new-uniform.component';
import { PaymentHistoryComponent } from './components/payment-history/payment-history.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { ResultComponent } from './components/result/result.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';

const routes: Routes = [
  {
    path: 'student-login',
    component: LoginComponent,
  },
  {
    path: 'student-register',
    component: RegisterComponent,
  },
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'dashboard',
        component: StudentDashboardComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
        children: [
          { path: 'edit-profile', component: EditProfileComponent },
          {
            path: 'change-password',
            component: ChangePasswordComponent,
          },
          { path: '', redirectTo: 'edit-profile', pathMatch: 'full' },
        ],
      },

      {
        path: 'class-information',
        component: ClassInformationComponent,
      },
      {
        path: 'e-learning',
        component: ELearningComponent,
      },
      {
        path: 'new-uniform',
        component: NewUniformComponent,
      },
      {
        path: 'payment',
        component: PaymentsComponent,
      },
      {
        path: 'result',
        component: ResultComponent,
      },
      {
        path: 'payment-history',
        component: PaymentHistoryComponent,
      },
    ],
  },
  {
    path: '',
    redirectTo: 'student/dashboard',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentPortalRoutingModule {}
