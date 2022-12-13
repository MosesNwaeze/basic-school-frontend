import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, retry, throwError, tap } from 'rxjs';
import { ApplicationApiService } from 'src/app/services/application-api.service';

@Component({
  selector: 'app-assign-staff',
  templateUrl: './assign-staff.component.html',
  styleUrls: ['./assign-staff.component.css'],
})
export class AssignStaffComponent implements OnInit {
  classData: Record<string, string>[] = [];
  staffData: Record<string, string>[] = [];
  assignTeacherForm = new FormGroup({
    class_name: new FormControl('', Validators.required),
    class_teacher: new FormControl('', Validators.required),
    asst_class_teacher: new FormControl('', Validators.required),
  });
  constructor(private apiService: ApplicationApiService) {}

  ngOnInit(): void {
    this.fetchClass();
    this.fetchTeacher();
  }

  get className() {
    return this.assignTeacherForm.get('class_name');
  }

  get classTeacher() {
    return this.assignTeacherForm.get('class_teacher');
  }

  get assistantClassTeacher() {
    return this.assignTeacherForm.get('asst_class_teacher');
  }

  assign() {
    if (
      this.assignTeacherForm.valid &&
      this.classTeacher?.value !== this.assistantClassTeacher?.value
    ) {
      const token = JSON.parse(localStorage.getItem('token') as string);
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      this.apiService
        .update(
          'assign-teacher-to-class',
          this.className?.value as string,
          JSON.stringify(this.assignTeacherForm.value),
          options
        )
        .pipe(
          retry(1),
          tap((response: any) => {
            if (response.status === 'success') {
              console.log('called');
              window.alert('Teacher assigned');
            }
          }),
          catchError(this.handleError)
        )
        .subscribe();
    }
  }

  fetchClass() {
    const token = JSON.parse(localStorage.getItem('token') as string);
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    this.apiService
      .getMultiple('class', options)
      .pipe(
        retry(1),
        tap((response: any) => {
          const { data, status } = response;
          if (status === 'success' && data.length > 0) {
            const { data } = response;
            this.classData = data;
          }
        }),
        catchError(this.handleError)
      )
      .subscribe();
  }

  fetchTeacher() {
    const token = JSON.parse(localStorage.getItem('token') as string);
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    this.apiService
      .getMultiple('staff', options)
      .pipe(
        retry(1),
        tap((response: any) => {
          const { status, data } = response;
          console.log(response);
          if (status === 'success' && data.length > 0) {
            const { data } = response;
            this.staffData = data;
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
}
