import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faRecordVinyl } from '@fortawesome/free-solid-svg-icons';
import { catchError, retry, tap, throwError } from 'rxjs';
import { ApplicationApiService } from 'src/app/services/application-api.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
})
export class PaymentsComponent implements OnInit {
  fees: Record<string, string>[] = [];
  totalPayment = 0;
  

  private _userData!: Record<string, string>;
  constructor(
    private apiService: ApplicationApiService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.fetchFee();

    const serve: any[] = JSON.parse(
      localStorage.getItem('serverResponse') as string
    ) ?? [{ first_name: '', student_class: '', staff_last_name: '' }];
    this._userData = serve[0];
  }

  fetchFee() {
    const token = JSON.parse(localStorage.getItem('serverResponse') as string)
      ? JSON.parse(localStorage.getItem('serverResponse') as string)[1]
      : '';

    const options: any = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    this.apiService
      .getMultiple('fee-types', options)
      .pipe(
        retry(1),
        tap((response: any) => {
          if (response.status === 'success' && response.data.length > 0) {
            this.fees = response.data;
            this.totalPayment = response.data.reduce(
              (acc: number, item: Record<string, string>) =>
                acc + item['amount'],
              0
            );
            this.localStorageService.payment = this.totalPayment;
            this.localStorageService.paymentPurpose= 'school fee';
          }
        }),
        catchError(this.handleError)
      )
      .subscribe();
  }

  paymentHistory() {
    this.router.navigate(['student/payment-history']);
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

  makePayment() {
    this.router.navigate(['payments']);
  }

  get userData(): Record<string, string> {
    return this._userData;
  }
  set userData(data: Record<string, string>) {
    this._userData = data;
  }

  
}
