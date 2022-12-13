import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { catchError, retry, tap, throwError } from 'rxjs';
import { ApplicationApiService } from 'src/app/services/application-api.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  userData!: Record<string, string>;
  successMessage = '';

  constructor(private apiService: ApplicationApiService) {}

  editForm = new FormGroup({
    lastName: new FormControl(
      typeof this.userData !== 'undefined' ? this.userData['last_name'] : ''
    ),
    middleName: new FormControl(
      typeof this.userData !== 'undefined' ? this.userData['middle_name'] : ''
    ),
    firstName: new FormControl(
      typeof this.userData !== 'undefined' ? this.userData['first_name'] : ''
    ),
    dateOfBirth: new FormControl(
      typeof this.userData !== 'undefined' ? this.userData['date_of_birth'] : ''
    ),
    gender: new FormControl(
      typeof this.userData !== 'undefined' ? this.userData['gender'] : ''
    ),
    religion: new FormControl(
      typeof this.userData !== 'undefined' ? this.userData['religion'] : ''
    ),
    address: new FormControl(
      typeof this.userData !== 'undefined' ? this.userData['address'] : ''
    ),
  });

  ngOnInit(): void {
    const serverResponse =
      JSON.parse(localStorage.getItem('serverResponse') as string) || [];
    this.userData = serverResponse.length > 0 ? serverResponse[0] : {};
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

  handleSubmit() {
    const formData = JSON.stringify(this.editForm.value);
    const token = JSON.parse(
      localStorage.getItem('serverResponse') as string
    )[1];

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    this.apiService
      .post(`students/${this.userData['student_id']}`, formData, options)
      .pipe(
        retry(1),
        tap((response: any) => {
          if (response.status === 'success') {
            this.successMessage = 'Data updated successfully';
          }
        }),
        catchError(this.handleError)
      )
      .subscribe();
  }
}
