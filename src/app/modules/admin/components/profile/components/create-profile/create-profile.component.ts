import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError, retry, tap } from 'rxjs';
import { ApplicationApiService } from 'src/app/services/application-api.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MyErrorStateMatcher } from 'src/app/utils/error-state-matcher';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css'],
})
export class CreateProfileComponent {
  fileName = '';
  file!: File;
  errorMsg = false;
  validFields = '';
  isValidFields = false;
  staff_id = '';
  successMessage = '';

  matcher = new MyErrorStateMatcher();

  staffForm = this.fb.group({
    first_name: new FormControl('', Validators.required),
    middle_name: new FormControl(''),
    last_name: new FormControl('', Validators.required),
    phone_number: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.required,Validators.email]),
    gender: new FormControl('', Validators.required),
    state_of_origin: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    date_of_birth: new FormControl('', Validators.required),
    religion: new FormControl('', Validators.required),
    staff_id: new FormControl(''),
    password: new FormControl('', Validators.required),
    confirm_password: new FormControl(''),
  });
  get staffFirstName() {
    return this.staffForm.get('first_name');
  }

  get staffLastName() {
    return this.staffForm.get('last_name');
  }

  get staffGender() {
    return this.staffForm.get('gender');
  }

  get staffStateOfOrigin() {
    return this.staffForm.get('state_of_origin');
  }

  get staffAddress() {
    return this.staffForm.get('address');
  }

  get staffDateOfBirth() {
    return this.staffForm.get('date_of_birth');
  }

  get staffReligion() {
    return this.staffForm.get('religion');
  }

  get password() {
    return this.staffForm.get('password');
  }

  get confirmPassword() {
    return this.staffForm.get('confirm_password');
  }

  get email(){
    return this.staffForm.get('email');
  }



  constructor(
    private apiService: ApplicationApiService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  async onSubmit() {
    if (this.staffForm.valid && this.file !== null) {
      Promise.all([this.createStaff(), this.createFileUpload()]);
    } else {
      this.isValidFields = true;
      this.validFields =
        'Please fill in the valid sections of the form fields'.toUpperCase();
    }
  }

  createStaff() {
    if (this.password?.value === this.confirmPassword?.value) {
      this.staffForm.controls.staff_id.setValue(this.generateRegNum());
      this.staff_id = this.generateRegNum();
      const options = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      this.apiService
        .post('admin', JSON.stringify(this.staffForm.value), options)
        .pipe(retry(1),tap((response:any)=>{
          if(response.status === 'success' && response.data.length > 0){
            const {token, data} = response;
            localStorage.setItem('token', JSON.stringify(token));
            this.localStorageService.signedUser = data;
          }

        }),catchError(this.handleError))
        .subscribe();
      this.apiService.erroStatus
        ? (this.errorMsg = true)
        : (this.errorMsg = false);
    } else {
      this.errorMsg = true;
      this.validFields = 'Password mismatch';
    }
  }

  createFileUpload() {
    this.staff_id = this.generateRegNum();
    const token = JSON.parse(localStorage.getItem('token') as string);
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('certificate_name', this.fileName);
    formData.append('staff_id', this.generateRegNum());

    this.apiService
      .post('staff-cert', formData, options)
      .pipe(
        retry(1),
        tap((response: any) => {
          if (response.status === 'success') {
            this.successMessage = 'File uploaded successfully!';
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
    if (this.staffForm.valid) {
      const generatedId =
        this.staffForm.controls.last_name.value +
        '-' +
        this.staffForm.controls.first_name.value +
        '-' +
        new Date().getFullYear().toString();
      return generatedId;
    } else {
      return '';
    }
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
