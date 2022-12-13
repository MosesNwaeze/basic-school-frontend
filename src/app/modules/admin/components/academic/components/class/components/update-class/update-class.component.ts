import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError, tap, retry } from 'rxjs';
import { ApplicationApiService } from 'src/app/services/application-api.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-update-class',
  templateUrl: './update-class.component.html',
  styleUrls: ['./update-class.component.css'],
})
export class UpdateClassComponent {
  private _classData: any = {};
  successMessage = '';

  constructor(
    private apiService: ApplicationApiService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  updateClass = new FormGroup({
    class_name: new FormControl('', Validators.required),
  });

  get className() {
    return this.updateClass.get('class_name');
  }

  set classData(data: Object) {
    this._classData = data;
  }

  get classData(): Object {
    return this._classData;
  }

  classForm = new FormGroup({
    class_name: new FormControl(''),
    class_capacity: new FormControl(''),
    class_category: new FormControl(''),
  });

  get classDataName() {
    return this.classForm.get('class_name');
  }

  get classDataCapacity() {
    return this.classForm.get('class_capacity');
  }

  get classDataCategory() {
    return this.classForm.get('class_category');
  }

  ngOnInit(): void {
    this.successMessage = '';
  }

  onSubmit() {
    if (this.classForm.valid) {
      this.update();
    }
  }

  search() {
    if (this.updateClass.valid) {
      const token = JSON.parse(localStorage.getItem('token') as string);
      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      this.apiService
        .getSingle('class', this.className?.value as string, options)
        .pipe(
          retry(1),
          tap((response) => {
            if (response.status === 'success' && response.data.length > 0) {
              const { data } = response;

              document
                .querySelector(`form[name='update-class']`)
                ?.classList.remove('hidden');

              this.classForm.patchValue({
                class_name: data[0]['class_name'],
                class_capacity: data[0]['class_capacity'],
                class_category: data[0]['class_category'],
              });
            }
          }),
          catchError(this.handleError)
        )
        .subscribe();
    }
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
        'class',
        this.className?.value as string,
        JSON.stringify(this.classForm.value),
        options
      )
      .pipe(
        retry(1),
        tap((response: any) => {
          if (response.status === 'success') {
            this.successMessage = 'Class updated successfully!';
          }
        }),
        catchError(this.handleError)
      )
      .subscribe();
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
}
