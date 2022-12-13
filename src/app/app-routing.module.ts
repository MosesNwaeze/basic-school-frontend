import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/components/home/home.component';

const routes: Routes = [
  {
    path: 'enroll-to-school',
    loadChildren: () =>
      import('./modules/enroll-to-school/enroll-to-school-routing.module').then(
        (comp) => comp.EnrollToSchoolRoutingModule
      ),
  },
  {
    path: 'curriculum',
    loadChildren: () =>
      import('./modules/curriculum/curriculum-routing.module').then(
        (cmp) => cmp.CurriculumRoutingModule
      ),
  },
  {
    path: 'mobile',
    loadChildren: () =>
      import('./modules/mobile-app/mobile-app-routing.module').then(
        (cmp) => cmp.MobileAppRoutingModule
      ),
  },
  {
    path: 'staff',
    loadChildren: () =>
      import('./modules/staff-portal/staff-portal-routing.module').then(
        (cmp) => cmp.StaffPortalRoutingModule
      ),
  },
  {
    path: 'student',
    loadChildren: () =>
      import('./modules/student-portal/student-portal-routing.module').then(
        (cmp) => cmp.StudentPortalRoutingModule
      ),
  },
  {
    path: 'payments',
    loadChildren: () =>
      import('./modules/payment/payment-routing.module').then(
        (cpm) => cpm.PaymentRoutingModule
      ),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin-routing.module').then(
        (cmp) => cmp.AdminRoutingModule
      ),
  },
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
