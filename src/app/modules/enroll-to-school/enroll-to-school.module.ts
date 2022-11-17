import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EnrollToSchoolRoutingModule } from './enroll-to-school-routing.module';
import { CheckResultComponent } from './components/check-result/check-result.component';
import { RegisterComponent } from './components/register/register.component';
import { EnrollToSchoolComponent } from './components/enroll-to-school/enroll-to-school.component';
import { LoginComponent } from './components/login/login.component';
import { CheckResultFormComponent } from './components/check-result-form/check-result-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';

@NgModule({
  declarations: [
    CheckResultComponent,
    RegisterComponent,
    EnrollToSchoolComponent,
    LoginComponent,
    CheckResultFormComponent,
    RegisterFormComponent,
  ],
  imports: [CommonModule, EnrollToSchoolRoutingModule, RouterModule],
})
export class EnrollToSchoolModule {}
