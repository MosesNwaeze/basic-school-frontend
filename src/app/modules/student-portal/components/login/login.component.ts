import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, Observable, Observer, retry, tap, throwError } from 'rxjs';
import { ApplicationApiService } from 'src/app/services/application-api.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  formsErrors = '';
  studentLogin = new FormGroup({
    student_id: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  errorMessage = '';

  constructor(
    private apiService: ApplicationApiService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  get student_id() {
    return this.studentLogin.get('student_id');
  }

  get password() {
    return this.studentLogin.get('password');
  }

  handleError(error: HttpErrorResponse) {
    let err = '';
    if (error.status === 0) {
      //console.error('An error occurred:', error.error);
      this.errorMessage = error.message;
    } else {
      // console.error(
      //   `Backend returned code ${error.status}, body was: `,
      //   error.error
      // );
    }
    err = 'Invalid Credentials';

    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

  handleLoginSubmit() {
    this.router.navigate(['/student/dashboard']);

    if (this.studentLogin.valid) {
      const options = {
        headers: {
          'Content-Type': 'application/json',
        }
      }
      const formData = new FormData();
      formData.append('student_id', this.student_id?.value as string);
      formData.append('password', this.password?.value as string);
      this.apiService
        .post('student-login', formData,options)
        .pipe(
          retry(1),
          tap((response: any) => {
            if (response.status === 'success') {
              const { token, data } = response;
              this.localStorageService.signedUser = data;
              localStorage.setItem('token', JSON.stringify(token));
              this.router.navigate(['/student/dashboard']);
            }
          }),
          catchError(this.handleError)
        )
        .subscribe();
    } else {
      this.formsErrors = 'All fields are required';
    }
  }
}
