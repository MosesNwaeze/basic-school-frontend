import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, retry, tap, throwError } from 'rxjs';
import { ApplicationApiService } from 'src/app/services/application-api.service';
import { MatDialog } from '@angular/material/dialog';
import { StudentDialogComponent } from 'src/app/modules/admin/components/student-dialog/student-dialog.component';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-view-class',
  templateUrl: './view-class.component.html',
  styleUrls: ['./view-class.component.css'],
})
export class ViewClassComponent implements OnInit {
  dataSource: Record<string, string>[] = [];
  displayedColumns = [
    'Class Name',
    'Class Teacher',
    'Assistant Class Teacher',
    'Class Capacity',
    'Available Space',
    'Students',
  ];

  availableSpace = 0;

  constructor(
    private apiService: ApplicationApiService,
    public dialog: MatDialog,
    private localStorageService: LocalStorageService
  ) {}
  ngOnInit(): void {
    this.fetchClass();
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
      .getMultiple('students-in-class', options)
      .pipe(
        retry(1),
        tap((response) => {
          if (response.status === 'success') {
            console.log(response.data);
            const { data } = response;
            this.dataSource = data;
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

  openDialog(students: any) {
    this.localStorageService.studentClassAssoc = students;
    const dialogRef = this.dialog.open(StudentDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
