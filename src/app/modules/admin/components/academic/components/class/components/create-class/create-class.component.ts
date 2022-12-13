import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, retry, throwError, tap } from 'rxjs';
import { ApplicationApiService } from 'src/app/services/application-api.service';

@Component({
  selector: 'app-create-class',
  templateUrl: './create-class.component.html',
  styleUrls: ['./create-class.component.css'],
})
export class CreateClassComponent implements OnInit {
  message = '';
  createClassForm = new FormGroup({
    class_name: new FormControl('', Validators.required),
    class_category: new FormControl('', Validators.required),
    class_capacity: new FormControl('', Validators.required),
  });

  constructor(private applicationService: ApplicationApiService) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  get ClassName() {
    return this.createClassForm.get('class_name');
  }

  get classCategory() {
    return this.createClassForm.get('class_category');
  }

  get classCapacity() {
    return this.createClassForm.get('class_capacity');
  }

  createClass() {
    if (this.createClassForm.valid) {
      const token = JSON.parse(localStorage.getItem('token') as string);

      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      this.applicationService
        .post('class', JSON.stringify(this.createClassForm.value), options)
        .pipe(
          retry(1),
          tap((response: any) => {
            if (response.status === 'success') {
              alert('Resource created');
            }
          }),
          catchError(this.handleError)
        )
        .subscribe();
    } else {
      this.message = 'All fields are required';
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
