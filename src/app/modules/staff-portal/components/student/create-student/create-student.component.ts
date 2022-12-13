import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApplicationApiService } from 'src/app/services/application-api.service';
import { catchError, retry, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css'],
})
export class CreateStudentComponent {
  fileName = '';
  file!: File;
  errorMsg = false;
  validFields = '';
  isValidFields = false;
  student_id = '';
  successMessage = '';

  studentForm = this.fb.group({
    first_name: new FormControl('', Validators.required),
    middle_name: new FormControl(''),
    last_name: new FormControl('', Validators.required),
    phone_number: new FormControl(''),
    email: new FormControl(''),
    gender: new FormControl('', Validators.required),
    state_of_origin: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    date_of_birth: new FormControl('', Validators.required),
    religion: new FormControl('', Validators.required),
    student_id: new FormControl(''),
    password: new FormControl('', Validators.required),
    confirm_password: new FormControl(''),
  });
  get studentFirstName() {
    return this.studentForm.get('first_name');
  }

  get studentLastName() {
    return this.studentForm.get('last_name');
  }

  get studentGender() {
    return this.studentForm.get('gender');
  }

  get studentStateOfOrigin() {
    return this.studentForm.get('state_of_origin');
  }

  get studentAddress() {
    return this.studentForm.get('address');
  }

  get studentDateOfBirth() {
    return this.studentForm.get('date_of_birth');
  }

  get studentReligion() {
    return this.studentForm.get('religion');
  }

  get password() {
    return this.studentForm.get('password');
  }

  get confirmPassword() {
    return this.studentForm.get('confirm_password');
  }

  constructor(
    private apiService: ApplicationApiService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getAssignedClass();
  }

  async onSubmit() {
    if (this.studentForm.valid && this.file !== null) {
      Promise.all([
        this.createStudent(),
        this.createFileUpload(),
        this.updateClassStudentAssoc(),
      ]);
    } else {
      this.isValidFields = true;
      this.validFields =
        'Please fill in the valid sections of the form fields'.toUpperCase();
    }
  }

  createStudent() {
    if (this.password?.value === this.confirmPassword?.value) {
      this.studentForm.controls.student_id.setValue(this.generateRegNum());
      this.student_id = this.generateRegNum();
      const token = JSON.parse(localStorage.getItem('token') as string);
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      this.apiService
        .post('student', JSON.stringify(this.studentForm.value), options)
        .subscribe((response) => console.log(response));
      this.apiService.erroStatus
        ? (this.errorMsg = true)
        : (this.errorMsg = false);
    } else {
      this.errorMsg = true;
      this.validFields = 'Password mismatch';
    }
  }

  createFileUpload() {
    this.student_id = this.generateRegNum();
    const token = JSON.parse(localStorage.getItem('token') as string);
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('certificate_name', this.fileName);
    formData.append('student_id', this.generateRegNum());

    this.apiService
      .post('student-cert', formData, options)
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
    this.apiService.erroStatus
      ? (this.errorMsg = true)
      : (this.errorMsg = false);
  }

  handleFileUpload(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fileName = file.name;
      this.file = file;
    }
  }

  generateRegNum() {
    if (this.studentForm.valid) {
      const generatedId =
        this.studentForm.controls.last_name.value +
        '-' +
        this.studentForm.controls.first_name.value +
        '-' +
        new Date().getFullYear().toString();
      return generatedId;
    } else {
      return '';
    }
  }

  getAssignedClass() {
    const token = JSON.parse(localStorage.getItem('token') as string);
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const staff_id = this.localStorageService.signedUser[0]['staff_id'];

    this.apiService
      .getSingle('staff-class', staff_id, options)
      .pipe(
        retry(1),
        tap((response: any) => {
          const { status, data } = response;
          if (status === 'success' && data.length > 0) {
            this.localStorageService.teacherClass = data;
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

  updateClassStudentAssoc() {
    const token = JSON.parse(localStorage.getItem('token') as string);
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const class_id = this.localStorageService.teacherClass[0]['class_id'];
    const data = {
      student_id: this.generateRegNum(),
      student_class: class_id,
    };

    this.apiService
      .post('students-in-class', JSON.stringify(data), options)
      .pipe(
        retry(1),
        tap((response: any) => {
          const { status } = response;
          if (status === 'success') {
            console.log('student class assoc created!');
          }
        }),
        catchError(this.handleError)
      )
      .subscribe();
  }
}
