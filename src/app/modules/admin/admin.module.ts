import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SchoolComponent } from './components/school/school.component';
import { AdmissionComponent } from './components/admission/admission.component';
import { ExaminationComponent } from './components/examination/examination.component';
import { FeePaymentComponent } from './components/fee-payment/fee-payment.component';
import { CreateStaffComponent } from './staff/create-staff/create-staff.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { StaffComponent } from './staff/staff/staff.component';
import { UpdateStaffComponent } from './staff/update-staff/update-staff.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditProfileComponent } from './components/profile/components/edit-profile/edit-profile.component';
import { CreateProfileComponent } from './components/profile/components/create-profile/create-profile.component';
import { ChangePasswordComponent } from './components/profile/components/change-password/change-password.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { AcademicComponent } from './components/academic/academic.component';
import { ClassComponent } from './components/academic/components/class/class.component';
import { CreateClassComponent } from './components/academic/components/class/components/create-class/create-class.component';
import { ViewClassComponent } from './components/academic/components/class/components/view-class/view-class.component';
import { UpdateClassComponent } from './components/academic/components/class/components/update-class/update-class.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { AssignStaffComponent } from './components/academic/components/class/components/assign-staff/assign-staff.component';
import { MatTableModule } from '@angular/material/table';
import { StudentDialogComponent } from './components/student-dialog/student-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { InventoryComponent } from './components/inventory/inventory.component';
import { ReportComponent } from './components/report/report.component';
import { SoftwareComponent } from './components/software/software.component';
import { CommunicationComponent } from './components/communication/communication.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ViewStaffComponent } from './staff/view-staff/view-staff.component';
import { DisplayInfoComponent } from './staff/display-info/display-info.component';

@NgModule({
  declarations: [
    SchoolComponent,
    AdmissionComponent,
    ExaminationComponent,
    FeePaymentComponent,
    CreateStaffComponent,
    StaffComponent,
    UpdateStaffComponent,
    AdminDashboardComponent,
    DashboardComponent,
    ProfileComponent,
    EditProfileComponent,
    CreateProfileComponent,
    ChangePasswordComponent,
    AcademicComponent,
    ClassComponent,
    CreateClassComponent,
    ViewClassComponent,
    UpdateClassComponent,
    AssignStaffComponent,
    StudentDialogComponent,
    InventoryComponent,
    ReportComponent,
    SoftwareComponent,
    CommunicationComponent,
    ViewStaffComponent,
    DisplayInfoComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatMenuModule,
    MatExpansionModule,
    MatTabsModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class AdminModule {}
