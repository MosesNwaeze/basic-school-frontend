import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcademicComponent } from './components/academic/academic.component';
import { ClassComponent } from './components/academic/components/class/class.component';
import { AssignStaffComponent } from './components/academic/components/class/components/assign-staff/assign-staff.component';
import { CreateClassComponent } from './components/academic/components/class/components/create-class/create-class.component';
import { UpdateClassComponent } from './components/academic/components/class/components/update-class/update-class.component';
import { ViewClassComponent } from './components/academic/components/class/components/view-class/view-class.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdmissionComponent } from './components/admission/admission.component';
import { CommunicationComponent } from './components/communication/communication.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ExaminationComponent } from './components/examination/examination.component';
import { FeePaymentComponent } from './components/fee-payment/fee-payment.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { ChangePasswordComponent } from './components/profile/components/change-password/change-password.component';
import { CreateProfileComponent } from './components/profile/components/create-profile/create-profile.component';
import { EditProfileComponent } from './components/profile/components/edit-profile/edit-profile.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ReportComponent } from './components/report/report.component';
import { SchoolComponent } from './components/school/school.component';
import { SoftwareComponent } from './components/software/software.component';
import { CreateStaffComponent } from './staff/create-staff/create-staff.component';
import { StaffComponent } from './staff/staff/staff.component';
import { UpdateStaffComponent } from './staff/update-staff/update-staff.component';
import { ViewStaffComponent } from './staff/view-staff/view-staff.component';

const routes: Routes = [
  {
    path: 'management',
    component: AdminDashboardComponent,
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
        children: [
          {
            path: 'create-profile',
            component: CreateProfileComponent,
          },
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
            redirectTo: 'create-profile',
            pathMatch: 'full',
          },
        ],
      },
      {
        path: 'manage-staff',
        component: StaffComponent,
        children: [
          {
            path: 'create-staff',
            component: CreateStaffComponent,
          },
          {
            path: 'update-staff',
            component: UpdateStaffComponent,
          },
          {
            path:'view-staff', component: ViewStaffComponent
          },
          {
            path: '',
            redirectTo: 'view-staff',
            pathMatch: 'full',
          },
        ],
      },
      {
        path: 'academic',
        component: AcademicComponent,
        children: [
          {
            path: 'class',
            component: ClassComponent,
            children: [
              {
                path: 'create-class',
                component: CreateClassComponent,
              },
              { path: 'view-class', component: ViewClassComponent },
              { path: 'update-class', component: UpdateClassComponent },
              { path: 'assign-staff', component: AssignStaffComponent },
              { path: '', redirectTo: 'view-class', pathMatch: 'full' },
            ],
          },
        ],
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'admission',
        component: AdmissionComponent,
      },
      {
        path: 'examination',
        component: ExaminationComponent,
      },
      {
        path: 'fee-payment',
        component: FeePaymentComponent,
      },

      {
        path: 'school',
        component: SchoolComponent,
      },
      {
        path: 'report',
        component: ReportComponent,
      },
      {
        path: 'communication',
        component: CommunicationComponent,
      },
      {
        path: 'software',
        component: SoftwareComponent,
      },
      {
        path:'inventory', component:InventoryComponent
      },
      {
        path:'', redirectTo:'dashboard',pathMatch:'full'
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
