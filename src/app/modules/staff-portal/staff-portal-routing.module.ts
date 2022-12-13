import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityComponent } from './components/activity/activity.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { CurriculumComponent } from './components/curriculum/curriculum.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ELearningComponent } from './components/e-learning/e-learning.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { StaffDashboardComponent } from './components/staff-dashboard/staff-dashboard.component';
import { StaffLoginComponent } from './components/staff-login/staff-login.component';
import { CreateStudentComponent } from './components/student/create-student/create-student.component';
import { StudentComponent } from './components/student/student/student.component';
import { UpdateStudentComponent } from './components/student/update-student/update-student.component';
import { TimeTableComponent } from './components/time-table/time-table.component';
import { UploadResultComponent } from './components/upload-result/upload-result.component';

const routes: Routes = [
  {
    path: 'login',
    component: StaffLoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '',
    component: StaffDashboardComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
        children: [
          {
            path: 'edit-profile',
            component: EditProfileComponent,
          },
          {
            path: 'change-password',
            component: ChangePasswordComponent,
          },

          {
            path: '',
            redirectTo: 'edit-profile',
            pathMatch: 'full',
          },
        ],
      },
      {
        path: 'uploads',
        component: UploadResultComponent,
      },
      {
        path: 'curriculum',
        component: CurriculumComponent,
      },
      {
        path: 'e-learning',
        component: ELearningComponent,
      },
      {
        path: 'time-table',
        component: TimeTableComponent,
      },

      {
        path: 'student',
        component: StudentComponent,
        children: [
          { path: 'create-student', component: CreateStudentComponent },
          { path: 'update-student', component: UpdateStudentComponent },
          { path: '', redirectTo: 'create-student', pathMatch: 'full' },
        ],
      },
      {
        path: 'upload-result',
        component: UploadResultComponent,
      },

      {
        path: 'dashboard/profile',
        component: ProfileComponent,
      },
      {
        path: 'dashboard/uploads',
        component: UploadResultComponent,
      },
      {
        path: 'dashboard/curriculum',
        component: CurriculumComponent,
      },
      {
        path: 'dashboard/e-learning',
        component: ELearningComponent,
      },
      {
        path: 'dashboard/time-table',
        component: TimeTableComponent,
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffPortalRoutingModule {}
