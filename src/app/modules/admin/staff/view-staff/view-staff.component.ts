import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, retry, tap, throwError } from 'rxjs';
import { ApplicationApiService } from 'src/app/services/application-api.service';
import { MatDialog } from '@angular/material/dialog';
import { DisplayInfoComponent } from '../display-info/display-info.component';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-view-staff',
  templateUrl: './view-staff.component.html',
  styleUrls: ['./view-staff.component.css'],
})
export class ViewStaffComponent implements OnInit {
  displayedColumns = ['staff-id', 'first-name', 'last-name', 'class','actions'];
  dataSource: Record<string, string>[] = [];

  constructor(
    private apiService: ApplicationApiService,
    public dialog: MatDialog,
    private localStorageSrvice: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.fetchStaff();
  }

  fetchStaff() {
    const token = JSON.parse(localStorage.getItem('token') as string);
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    this.apiService
      .getMultiple('staff-class', options)
      .pipe(
        retry(1),
        tap((response: any) => {
          const { status, data } = response;
          if (status === 'success' && data.length > 0) {
            this.dataSource = data;
            console.log(data);
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

  delete(id: string) {
    //make an api call to delete
    console.log(id);
  }

  openDialog(id: string) {
    const dialogRef = this.dialog.open(DisplayInfoComponent);
    const data = this.dataSource.filter((item) => item['staff_id'] === id);
    this.localStorageSrvice.staffInfo = data;
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
