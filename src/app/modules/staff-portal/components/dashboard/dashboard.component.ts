import { HttpErrorResponse } from '@angular/common/http';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { catchError, retry, tap, throwError } from 'rxjs';
import { ApplicationApiService } from 'src/app/services/application-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  currentDate = new Date().toLocaleDateString();
  schoolNews: Record<string, string>[] = [];
  staffActivities: Record<string, string>[] = [];
  lorem = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
  quam quasi non iure repudiandae cumque perferendis ab quas
  consequuntur temporibus labore eligendi, sapiente, perspiciatis
  excepturi odit aut consectetur molestiae, quibusdam rem quod
  voluptatum. Cumque ipsa id, voluptatum officia maxime dolorem.`;
  colorScheme = [
    'red',
    'blue',
    'green',
    'yellow',
    'brown',
    'chartreuse',
    'chocolate',
    'cornflowerblue',
    'cyan',
    'darkcyan',
  ];

  constructor(
    private applicationService: ApplicationApiService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const token = JSON.parse(localStorage.getItem('serverResponse') as string)
      ? JSON.parse(localStorage.getItem('serverResponse') as string)[1]
      : '';

    const options: any = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    this.applicationService
      .getMultiple('school-news', options)
      .pipe(
        retry(1),
        tap((response) => {
          if (response.status === 'success') {
            this.schoolNews = response.data;
          }
        }),
        catchError(this.handleError)
      )
      .subscribe();

    this.applicationService
      .getMultiple('staff-activity', options)
      .pipe(
        retry(1),
        tap((response) => {
          if (response.status === 'success') {
            this.staffActivities = response.data;
          }
        }),
        catchError(this.handleError)
      )
      .subscribe();
  }

  getLocalDateString(date: string): string {
    const datePosted = new Date(date);
    return datePosted.toLocaleDateString();
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
