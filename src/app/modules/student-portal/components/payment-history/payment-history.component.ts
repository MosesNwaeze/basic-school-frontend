import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, retry, tap, throwError } from 'rxjs';
import { ApplicationApiService } from 'src/app/services/application-api.service';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.css'],
})
export class PaymentHistoryComponent implements OnInit {
  paymentHistory: Record<string, string>[] = [];

  constructor(
    private router: Router,
    private apiService: ApplicationApiService
  ) {}

  ngOnInit(): void {
    this.fetchPayments();
  }

  fetchPayments() {
    //payments-history/:student_id
    const token = JSON.parse(localStorage.getItem('serverResponse') as string)
      ? JSON.parse(localStorage.getItem('serverResponse') as string)[1]
      : '';

    const options: any = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    const student_id = JSON.parse(
      localStorage.getItem('serverResponse') as string
    )
      ? JSON.parse(localStorage.getItem('serverResponse') as string)[0]
          .student_id
      : '';

    this.apiService
      .getSingle('payments-history', student_id, options)
      .pipe(
        retry(1),
        tap((response) => {
          if (response.status === 'success' && response.data.length > 0) {
            this.paymentHistory = response.data;
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
