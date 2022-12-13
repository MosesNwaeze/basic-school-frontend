import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { catchError, retry, tap, throwError } from 'rxjs';
import { ApplicationApiService } from 'src/app/services/application-api.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MyErrorStateMatcher } from 'src/app/utils/error-state-matcher';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent {
  matcher = new MyErrorStateMatcher();

  editForm = new FormGroup({
    last_name: new FormControl(''),
    middle_name: new FormControl(''),
    first_name: new FormControl(''),
    date_of_birth: new FormControl(''),
    gender: new FormControl(''),
    religion: new FormControl(''),
    address: new FormControl(''),
    email: new FormControl(''),
    phone_number: new FormControl(''),
    state_of_origin: new FormControl(''),
    passport: new FormControl(''),
  });

  constructor(
    private localStorageService: LocalStorageService,
    private apiService: ApplicationApiService
  ) {}

  ngOnInit(): void {
    if (this.localStorageService.signedUser.length > 0) {
      this.editForm.patchValue({
        passport: this.localStorageService.signedUser[0]['passport'],
        address: this.localStorageService.signedUser[0]['address'],
        date_of_birth: this.localStorageService.signedUser[0]['date_of_birth'].split('T')[0],
        email: this.localStorageService.signedUser[0]['email'],
        first_name: this.localStorageService.signedUser[0]['first_name'],
        gender: this.localStorageService.signedUser[0]['gender'],
        last_name: this.localStorageService.signedUser[0]['last_name'],
        middle_name: this.localStorageService.signedUser[0]['middle_name'],
        phone_number: this.localStorageService.signedUser[0]['phone_number'],
        religion: this.localStorageService.signedUser[0]['religion'],
        state_of_origin:
          this.localStorageService.signedUser[0]['state_of_origin'],
      });
    }
  }

  handleSubmit() {
    const token = JSON.parse(localStorage.getItem('token') as string);
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const staff_id = this.localStorageService.signedUser[0]['staff_id'];
    this.apiService
      .update('staff', staff_id, JSON.stringify(this.editForm.value), options)
      .pipe(
        retry(1),
        tap((response: any) => {
          const { status } = response;
          if (status === 'success') {
            alert('Staff updated successfully');
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
