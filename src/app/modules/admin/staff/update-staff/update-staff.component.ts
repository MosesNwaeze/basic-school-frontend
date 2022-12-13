import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError, retry, tap } from 'rxjs';
import { ApplicationApiService } from 'src/app/services/application-api.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-update-staff',
  templateUrl: './update-staff.component.html',
  styleUrls: ['./update-staff.component.css'],
})
export class UpdateStaffComponent {
  fileName = '';
  file!: File;
  private _staffData: any = {};
  successMessage = '';

  constructor(
    private apiService: ApplicationApiService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  updateStaff = new FormGroup({
    staff_id: new FormControl('', Validators.required),
  });

  get staffId() {
    return this.updateStaff.get('staff_id');
  }

  set staffData(data: Object) {
    this._staffData = data;
  }

  get staffData(): Object {
    return this._staffData;
  }

  staffForm = new FormGroup({
    first_name: new FormControl(''),
    middle_name: new FormControl(''),
    last_name: new FormControl(''),
    phone_number: new FormControl(''),
    email: new FormControl(''),
    gender: new FormControl(''),
    state_of_origin: new FormControl(''),
    address: new FormControl(''),
    date_of_birth: new FormControl(''),
    religion: new FormControl(''),
  });

  get staffFirstName() {
    return this.staffForm.get('firstName');
  }

  get staffLastName() {
    return this.staffForm.get('lastName');
  }

  get staffGender() {
    return this.staffForm.get('gender');
  }

  get staffStateOfOrigin() {
    return this.staffForm.get('stateOfOrigin');
  }

  get staffAddress() {
    return this.staffForm.get('address');
  }

  get staffDateOfBirth() {
    return this.staffForm.get('dateOfBirth');
  }

  get staffReligion() {
    return this.staffForm.get('religion');
  }

  ngOnInit(): void {
    this.successMessage = '';
  }

  onSubmit() {
    if (this.staffForm.valid) {
      this.update();
    }
  }

  search() {
    const token = JSON.parse(localStorage.getItem('token') as string);
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const staffId = this.updateStaff.get('staff_id')?.value as string;

    this.apiService
      .getSingle('staff', staffId, options)
      .pipe(
        retry(1),
        tap((response) => {
          const { status, data } = response;
          if (status === 'success' && data.length > 0) {
            const { data } = response;
            document
              .querySelector(`form[name='update-staff']`)
              ?.classList.remove('hidden');

            this.staffForm.patchValue({
              first_name: data[0]['first_name'],
              last_name: data[0]['last_name'],
              address: data[0]['address'],
              date_of_birth: data[0]['date_of_birth'].split('T')[0],
              email: data[0]['email'],
              gender: data[0]['gender'],
              middle_name: data[0]['middle_name'],
              phone_number: data[0]['phone_number'],
              religion: data[0]['religion'],
              state_of_origin: data[0]['state_of_origin'],
            });
          }
        }),
        catchError(this.handleError)
      )
      .subscribe();
  }

  update() {
    const token = JSON.parse(localStorage.getItem('token') as string);
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    const staffId = this.updateStaff.get('staff_id')?.value as string;

    this.apiService
      .update('staff', staffId, JSON.stringify(this.staffForm.value), options)
      .pipe(
        retry(1),
        tap((response: any) => {
          if (response.status === 'success') {
            this.successMessage = 'Account updated successfully!';
          }
        }),
        catchError(this.handleError)
      )
      .subscribe();
  }

  handleFileUpload(event: any) {
    const file: any = event.target.files[0];
    if (file) {
      this.file = file;
      localStorage.setItem('photoUrl', JSON.stringify(file.name));
      this.fileName = file.name;
      this.file = file;
    }
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

  postFile() {
    const token = JSON.parse(localStorage.getItem('token') as string);
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('certificate_name', this.fileName);
    formData.append('staff_id', this.staffId?.value as string);

    this.apiService
      .update('staff-cert', this.staffId?.value as string, formData, options)
      .pipe(
        retry(1),
        tap((response: any) => {
          if (response.status === 'success') {
            this.successMessage = 'staff account successfull created!';
          }
        }),
        catchError(this.handleError)
      )
      .subscribe();
  }
}
