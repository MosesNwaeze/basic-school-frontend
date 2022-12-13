import { Component, OnInit } from '@angular/core';
import {} from '@angular/forms';
import { Router } from '@angular/router';
import { ApplicationApiService } from '../../../../services/application-api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { catchError, retry, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-check-result-form',
  templateUrl: './check-result-form.component.html',
  styleUrls: ['./check-result-form.component.css'],
})
export class CheckResultFormComponent implements OnInit {
  formGroup!: FormGroup;
  result!: [Record<string, string>];
  errorMessage = '';

  constructor(
    private router: Router,
    private apiService: ApplicationApiService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      registrationNumber: new FormControl('', Validators.required),
    });
  }

  get registrationNumber() {
    return this.formGroup.get('registrationNumber')?.value;
  }

  async displayResult(): Promise<void> {
    this.apiService
      .entranceStudentGet('entrance-result', this.registrationNumber)
      .pipe(
        retry(1),
        tap((response: any) => {
          if (response.status === 'success') {
            this.result = response.data;
            this.localStorageService.entranceResult = this.result;
            this.router.navigate(['enroll-to-school/display-result']);
          }
        }),
        catchError(this.handleError)
      )
      .subscribe();

    //handle on error case.
  }
  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      //console.error('An error occurred:', error.error);
    } else {
      // console.error(
      //   `Backend returned code ${error.status}, body was: `,
      //   error.error
      // );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
