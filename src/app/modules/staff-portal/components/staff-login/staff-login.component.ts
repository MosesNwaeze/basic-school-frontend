import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, retry, tap, throwError } from 'rxjs';
import { ApplicationApiService } from 'src/app/services/application-api.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-staff-login',
  templateUrl: './staff-login.component.html',
  styleUrls: ['./staff-login.component.css'],
})
export class StaffLoginComponent {
  formsErrors = '';
  staffLogin = new FormGroup({
    staff_id: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  adminLogin = new FormGroup({
    school_app_id: new FormControl('', Validators.required),
    school_app_secrete: new FormControl('', Validators.required),
  });

  constructor(
    private apiService: ApplicationApiService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  get staff_id() {
    return this.staffLogin.get('staff_id');
  }

  get password() {
    return this.staffLogin.get('password');
  }

  get schoolAppId() {
    return this.adminLogin.get('school_app_id');
  }

  get schoolAppSecrete() {
    return this.adminLogin.get('school_app_secrete');
  }

  handleLoginSubmit() {
    if (this.staffLogin.valid) {
      const options = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      this.apiService
        .post('staff-login', JSON.stringify(this.staffLogin.value), options)
        .pipe(
          retry(1),
          tap((response: any) => {
            if (response.status === 'success') {
              const { token, data } = response;
              const { isAdmin } = data[0];
              localStorage.setItem('token', JSON.stringify(token));
              this.localStorageService.signedUser = data;
              if (isAdmin) {
                this.router.navigate(['admin/management']);
              } else {
                this.router.navigate(['staff']);
              }
            }
          }),
          catchError(this.handleError)
        )
        .subscribe();
    } else {
      this.formsErrors = 'All fields are required';
    }
  }

  handleAdminLogin() {
    this.router.navigate(['admin/management/profile']);
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    this.apiService
      .post('verify-school', JSON.stringify(this.adminLogin.value), options)
      .pipe(
        retry(1),
        tap((response: any) => {
          const {status,data} = response;
          if (status === 'success' && data.length > 0) {
            this.router.navigate(['admin/management/profile']);
          } else {
            this.formsErrors = 'Operation is not authorized';
          }
        }),
        catchError(this.handleError)
      )
      .subscribe();
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
