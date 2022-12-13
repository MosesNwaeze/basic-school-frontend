import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, retry, tap, throwError } from 'rxjs';
import { ApplicationApiService } from 'src/app/services/application-api.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css'],
})
export class UpdateStudentComponent implements OnInit {
  fileName = '';
  file!: File;
  private _studentData: any = {};
  successMessage = '';

  constructor(
    private apiService: ApplicationApiService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  updateStudent = new FormGroup({
    student_id: new FormControl('', Validators.required),
  });

  get registrationNumber() {
    return this.updateStudent.get('student_id');
  }

  set studentData(data: Object) {
    this._studentData = data;
  }

  get studentData(): Object {
    return this._studentData;
  }

  studentForm = new FormGroup({
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

  get studentFirstName() {
    return this.studentForm.get('firstName');
  }

  get studentLastName() {
    return this.studentForm.get('lastName');
  }

  get studentGender() {
    return this.studentForm.get('gender');
  }

  get studentStateOfOrigin() {
    return this.studentForm.get('stateOfOrigin');
  }

  get studentAddress() {
    return this.studentForm.get('address');
  }

  get studentDateOfBirth() {
    return this.studentForm.get('dateOfBirth');
  }

  get studentReligion() {
    return this.studentForm.get('religion');
  }

  ngOnInit(): void {
    this.successMessage = '';
  }

  onSubmit() {
    if (this.studentForm.valid) {
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
    this.apiService
      .getSingle('student', this.registrationNumber?.value as string, options)
      .pipe(
        retry(1),
        tap((response) => {
          if (response.status === 'success' && response.data.length > 0) {
            const { data } = response;

            document
              .querySelector(`form[name='update-student']`)
              ?.classList.remove('hidden');

            this.studentForm.patchValue({
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

    this.apiService
      .update(
        'student',
        this.registrationNumber?.value as string,
        JSON.stringify(this.studentForm.value),
        options
      )
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
    formData.append('student_id', this.registrationNumber?.value as string);

    this.apiService
      .update(
        'student-cert',
        this.registrationNumber?.value as string,
        formData,
        options
      )
      .pipe(
        retry(1),
        tap((response: any) => {
          if (response.status === 'success') {
            this.successMessage = 'student account successfull created!';
          }
        }),
        catchError(this.handleError)
      )
      .subscribe();
  }
}
