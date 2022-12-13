import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, retry, tap, throwError } from 'rxjs';
import { ApplicationApiService } from 'src/app/services/application-api.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-upload-result',
  templateUrl: './upload-result.component.html',
  styleUrls: ['./upload-result.component.css'],
})
export class UploadResultComponent implements OnInit {
  subjects: Record<string, string>[] = [];
  exams: Record<string, string>[] = [];
  passport = '';
  last_name = '';

  results: Record<string, string>[] = [];

  resultForm = new FormGroup({
    student_id: new FormControl('', Validators.required),
    subject_id: new FormControl('', Validators.required),
    score: new FormControl('', Validators.required),
    exam_id: new FormControl('', Validators.required),
    remark: new FormControl('', Validators.required),
    staff_id: new FormControl(''),
  });

  constructor(
    private applicationApiService: ApplicationApiService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.fetchSubjects();
    this.fetchExams();

    this.last_name =
      this.localStorageService.signedUser.length > 0
        ? this.localStorageService.signedUser[0]['last_name']
        : '';
  }

  get registrationNumber() {
    return this.resultForm.get('student_id');
  }

  get subject() {
    return this.resultForm.get('subject_id');
  }

  get score() {
    return this.resultForm.get('score');
  }

  get examinationTitle() {
    return this.resultForm.get('exam_id');
  }

  get remark() {
    return this.resultForm.get('remark');
  }

  fetchSubjects() {
    const token = JSON.parse(localStorage.getItem('token') as string);
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    this.applicationApiService
      .getMultiple('subject', options)
      .pipe(
        retry(1),
        tap((response) => {
          if (response.status === 'success') {
            const { data } = response;
            this.subjects = data;
          }
        }),
        catchError(this.handleError)
      )
      .subscribe();
  }

  fetchExams() {
    const token = JSON.parse(localStorage.getItem('token') as string);
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    this.applicationApiService
      .getMultiple('examination', options)
      .pipe(
        retry(1),
        tap((response) => {
          if (response.status === 'success') {
            const { data } = response;
            this.exams = data;
          }
        }),
        catchError(this.handleError)
      )
      .subscribe();
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

  uploadResult() {
    //make a request to the backend
    const token = JSON.parse(localStorage.getItem('token') as string);
    const staff_id =
      this.localStorageService.signedUser.length > 0
        ? this.localStorageService.signedUser[0]['staff_id']
        : '';

    this.resultForm.patchValue({
      staff_id: staff_id,
    });

    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    this.applicationApiService
      .post('result', JSON.stringify(this.resultForm.value), options)
      .pipe(
        retry(1),
        tap((response: any) => {
          if (response.status === 'success') {
            //Display a toast notification showing completed action
            this.fetchResult();
          }
        }),
        catchError(this.handleError)
      )
      .subscribe();
  }

  fetchResult() {
    const token = JSON.parse(localStorage.getItem('token') as string);

    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    this.applicationApiService
      .getMultiple('result', options)
      .pipe(
        retry(1),
        tap((response) => {
          if (response.status === 'success') {
            const { data } = response;
            this.results = data;
          }
        }),
        catchError(this.handleError)
      )
      .subscribe();
  }

  edit(id: number) {
    console.log(id);
  }

  trash(id: number) {
    console.log(id);
  }
}
