import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApplicationApiService } from 'src/app/services/application-api.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent implements OnInit {
  fileName = '';
  file!: File;
  //photoUrl = JSON.parse(localStorage.getItem('photoUrl') as string);
  errorMsg = false;
  validFields = '';
  isValidFields = false;

  entranceApplicantForm = new FormGroup({
    guardianForm: new FormGroup({
      firstName: new FormControl('', Validators.required),
      middleName: new FormControl(''),
      lastName: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      occupation: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      stateOfOrigin: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      religion: new FormControl('', Validators.required),
    }),

    studentForm: new FormGroup({
      firstName: new FormControl('', Validators.required),
      middleName: new FormControl(''),
      lastName: new FormControl('', Validators.required),
      phoneNumber: new FormControl(''),
      email: new FormControl(''),
      classToEnter: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      stateOfOrigin: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      religion: new FormControl('', Validators.required),
    }),
  });

  get studentFirstName() {
    return this.entranceApplicantForm.controls.studentForm.get('firstName');
  }

  get studentLastName() {
    return this.entranceApplicantForm.controls.studentForm.get('lastName');
  }

  get studentClassToEnter() {
    return this.entranceApplicantForm.controls.studentForm.get('classToEnter');
  }

  get studentGender() {
    return this.entranceApplicantForm.controls.studentForm.get('gender');
  }

  get studentStateOfOrigin() {
    return this.entranceApplicantForm.controls.studentForm.get('stateOfOrigin');
  }

  get studentAddress() {
    return this.entranceApplicantForm.controls.studentForm.get('address');
  }

  get studentDateOfBirth() {
    return this.entranceApplicantForm.controls.studentForm.get('dateOfBirth');
  }

  get studentReligion() {
    return this.entranceApplicantForm.controls.studentForm.get('religion');
  }

  get ParentFirstName() {
    return this.entranceApplicantForm.controls.guardianForm.get('firstName');
  }
  get ParentLastName() {
    return this.entranceApplicantForm.controls.guardianForm.get('lastName');
  }
  get phoneNumber() {
    return this.entranceApplicantForm.controls.guardianForm.get('phoneNumber');
  }
  get ParentEmail() {
    return this.entranceApplicantForm.controls.guardianForm.get('email');
  }
  get ParentOccupation() {
    return this.entranceApplicantForm.controls.guardianForm.get('occupation');
  }
  get ParentGender() {
    return this.entranceApplicantForm.controls.guardianForm.get('gender');
  }
  get ParentStateOfOrigin() {
    return this.entranceApplicantForm.controls.guardianForm.get(
      'stateOfOrigin'
    );
  }
  get ParentAddress() {
    return this.entranceApplicantForm.controls.guardianForm.get('address');
  }
  get ParentReligion() {
    return this.entranceApplicantForm.controls.guardianForm.get('religion');
  }

  constructor(
    private apiService: ApplicationApiService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {}

  async onSubmit() {
    if (this.entranceApplicantForm.valid) {
      const resolved = await Promise.all([
        this.createGuardian(),
        this.createStudent(),
        setTimeout(
          () => this.mapEntranceStudentGuardianStudentGuardian(),
          2000
        ),
      ]);
      this.localStorageService.paymentPurpose = 'entrance fee';
      this.router.navigate(['payments']);
    } else {
      this.isValidFields = true;
      this.validFields =
        'Please fill in the valid sections of the form fields'.toUpperCase();
    }
  }

  createGuardian() {
    const formData = new FormData();
    formData.append(
      'firstName',
      this.entranceApplicantForm.controls.guardianForm.controls.firstName
        .value as any
    );
    formData.append(
      'middleName',
      this.entranceApplicantForm.controls.guardianForm.controls.middleName
        .value as any
    );
    formData.append(
      'lastName',
      this.entranceApplicantForm.controls.guardianForm.controls.lastName
        .value as any
    );
    formData.append(
      'phoneNumber',
      this.entranceApplicantForm.controls.guardianForm.controls.phoneNumber
        .value as any
    );
    formData.append(
      'email',
      this.entranceApplicantForm.controls.guardianForm.controls.email
        .value as any
    );
    formData.append(
      'occupation',
      this.entranceApplicantForm.controls.guardianForm.controls.occupation
        .value as any
    );
    formData.append(
      'gender',
      this.entranceApplicantForm.controls.guardianForm.controls.gender
        .value as any
    );
    formData.append(
      'stateOfOrigin',
      this.entranceApplicantForm.controls.guardianForm.controls.stateOfOrigin
        .value as any
    );
    formData.append(
      'address',
      this.entranceApplicantForm.controls.studentForm.controls.address
        .value as any
    );
    formData.append(
      'religion',
      this.entranceApplicantForm.controls.studentForm.controls.religion
        .value as any
    );

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
      .post('entrance-student-parent', formData, options)
      .subscribe((response) => console.log(response));
    this.apiService.erroStatus
      ? (this.errorMsg = true)
      : (this.errorMsg = false);
    return true;
  }

  createStudent() {
    const formData = new FormData();
    formData.append(
      'firstName',
      this.entranceApplicantForm.controls.studentForm.controls.firstName
        .value as any
    );
    formData.append(
      'middleName',
      this.entranceApplicantForm.controls.studentForm.controls.middleName
        .value as any
    );
    formData.append(
      'lastName',
      this.entranceApplicantForm.controls.studentForm.controls.lastName
        .value as any
    );
    formData.append(
      'phoneNumber',
      this.entranceApplicantForm.controls.studentForm.controls.phoneNumber
        .value as any
    );
    formData.append(
      'email',
      this.entranceApplicantForm.controls.studentForm.controls.email
        .value as any
    );
    formData.append(
      'classToEnter',
      this.entranceApplicantForm.controls.studentForm.controls.classToEnter
        .value as any
    );
    formData.append(
      'gender',
      this.entranceApplicantForm.controls.studentForm.controls.gender
        .value as any
    );
    formData.append(
      'stateOfOrigin',
      this.entranceApplicantForm.controls.studentForm.controls.stateOfOrigin
        .value as any
    );
    formData.append(
      'address',
      this.entranceApplicantForm.controls.studentForm.controls.address
        .value as any
    );
    formData.append(
      'dateOfBirth',
      this.entranceApplicantForm.controls.studentForm.controls.dateOfBirth
        .value as any
    );
    formData.append(
      'religion',
      this.entranceApplicantForm.controls.studentForm.controls.religion
        .value as any
    );

    formData.append('studentPhoto', this.file);

    formData.append('registrationNumber', this.generateRegNum());
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
      .post('entrance-student', formData, options)
      .subscribe((response) => console.log(response));
    this.apiService.erroStatus
      ? (this.errorMsg = true)
      : (this.errorMsg = false);
    return true;
  }

  handleFileUpload(event: any) {
    const file: any = event.target.files[0];
    if (file) {
      console.log(file);
      localStorage.setItem('photoUrl', JSON.stringify(file.name));
      this.fileName = file.name;
      this.file = file;
    }
  }

  generateRegNum() {
    if (this.entranceApplicantForm.valid) {
      const generatedId =
        this.entranceApplicantForm.controls.studentForm.controls.lastName
          .value +
        '/' +
        this.entranceApplicantForm.controls.studentForm.controls.firstName
          .value +
        '/' +
        new Date().getFullYear().toString();
      return generatedId;
    } else {
      return '';
    }
  }

  mapEntranceStudentGuardianStudentGuardian() {
    const formData = new FormData();

    formData.append(
      'parentEmail',
      this.entranceApplicantForm.controls.guardianForm.controls.email
        .value as string
    );
    formData.append('registrationNumber', this.generateRegNum());
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
      .post('entrance-student-parent-assoc', formData, options)
      .subscribe((res) => console.log(res));
  }
}
