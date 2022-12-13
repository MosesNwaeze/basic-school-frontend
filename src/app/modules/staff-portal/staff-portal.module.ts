import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffPortalRoutingModule } from './staff-portal-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UploadResultComponent } from './components/upload-result/upload-result.component';
import { CurriculumComponent } from './components/curriculum/curriculum.component';
import { ELearningComponent } from './components/e-learning/e-learning.component';
import { TimeTableComponent } from './components/time-table/time-table.component';
import { StaffDashboardComponent } from './components/staff-dashboard/staff-dashboard.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StaffLoginComponent } from './components/staff-login/staff-login.component';
import { RegisterComponent } from './components/register/register.component';
import { CreateStudentComponent } from './components/student/create-student/create-student.component';
import { UpdateStudentComponent } from './components/student/update-student/update-student.component';
import { StudentComponent } from './components/student/student/student.component';
import { ActivityComponent } from './components/activity/activity.component';

import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [
    DashboardComponent,
    ProfileComponent,
    UploadResultComponent,
    CurriculumComponent,
    ELearningComponent,
    TimeTableComponent,
    StaffDashboardComponent,
    EditProfileComponent,
    ChangePasswordComponent,
    StaffLoginComponent,
    RegisterComponent,
    CreateStudentComponent,
    UpdateStudentComponent,
    StudentComponent,
    ActivityComponent,
  ],
  imports: [
    CommonModule,
    StaffPortalRoutingModule,
    MatToolbarModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    ReactiveFormsModule,
    MatExpansionModule,
  ],
})
export class StaffPortalModule {}
