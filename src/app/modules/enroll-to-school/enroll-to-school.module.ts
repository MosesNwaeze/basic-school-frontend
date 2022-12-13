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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule} from '@angular/material/table';
import { DisplayResultComponent } from './components/display-result/display-result.component';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  declarations: [
    CheckResultComponent,
    RegisterComponent,
    EnrollToSchoolComponent,
    LoginComponent,
    CheckResultFormComponent,
    RegisterFormComponent,
    DisplayResultComponent,
  ],
  imports: [
    CommonModule,
    EnrollToSchoolRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatToolbarModule,
    MatRippleModule,
  ],
})
export class EnrollToSchoolModule {}
