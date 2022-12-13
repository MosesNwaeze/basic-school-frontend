import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, retry, tap } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import { ApplicationApiService } from 'src/app/services/application-api.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { DAYS } from './days.type';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css'],
})
export class StudentDashboardComponent implements OnInit {
  time_table: Record<string, string>[] = [];
  isTimeTableEmpty = false;

  currentDay = new Date().getDay().toString();

  constructor(
    private router: Router,
    private apiService: ApplicationApiService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.getTimeTableInDay();
  }

  handleResult() {
    this.router.navigate(['student/result']);
  }

  handlePayment() {
    this.router.navigate(['student/payment']);
  }

  handleProfile() {
    this.router.navigate(['student/profile']);
  }

  getDayInLetters() {
    const days: any = {
      '0': 'Sunday',
      '1': 'Monday',
      '2': 'Tuesday',
      '3': 'Wednesday',
      '4': 'Thursday',
      '5': 'Friday',
      '6': 'Saturday',
    };

    if (this.currentDay in days) {
      return days[this.currentDay];
    }
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

  getTimeTableInDay() {
    const token = JSON.parse(localStorage.getItem('token') as string);
    const options: any = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    const studentClass =
      this.localStorageService.signedUser.length > 0
        ? this.localStorageService.signedUser[0]['student_class']
        : '';

    this.apiService
      .getTimeTable(
        'time-table',
        studentClass || 'God is nice',
        this.getDayInLetters().toLowerCase(),
        options
      )
      .pipe(
        tap((response: any) => {
          if (response.status === 'success' && response.data.length > 0) {
            this.isTimeTableEmpty = true;
            this.time_table = response.data;
          }
        }),
        catchError(this.handleError)
      )
      .subscribe();
  }
}
