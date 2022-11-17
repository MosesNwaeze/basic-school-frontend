import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckResultComponent } from './components/check-result/check-result.component';
import { RegisterComponent } from './components/register/register.component';
import { EnrollToSchoolComponent } from './components/enroll-to-school/enroll-to-school.component';
import { CheckResultFormComponent } from './components/check-result-form/check-result-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';

const routes: Routes = [
  { path: 'enroll-to-school/check-result', component: CheckResultComponent },
  { path: 'enroll-to-school/register', component: RegisterComponent },
  {
    path: 'enroll-to-school/check-result-form',
    component: CheckResultFormComponent,
  },
  { path: 'enroll-to-school/register-form', component: RegisterFormComponent },
  { path: '', redirectTo: 'enroll-to-school', pathMatch: 'full' },
  { path: '', component: EnrollToSchoolComponent },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class EnrollToSchoolRoutingModule {}
