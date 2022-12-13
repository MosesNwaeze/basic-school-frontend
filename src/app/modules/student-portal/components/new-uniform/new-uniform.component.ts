import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { retry, tap } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { ApplicationApiService } from 'src/app/services/application-api.service';

@Component({
  selector: 'app-new-uniform',
  templateUrl: './new-uniform.component.html',
  styleUrls: ['./new-uniform.component.css'],
})
export class NewUniformComponent {
  uniforms: Record<string, string>[] = [];
  count = 1;
  activeValue: Array<string> = [];
  selectedValue: any[] = [];

  private _userData!: Record<string, string>;
  constructor(
    private apiService: ApplicationApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchUniforms();

    const serve: any[] = JSON.parse(
      localStorage.getItem('serverResponse') as string
    ) ?? [{ first_name: '', student_class: '', staff_last_name: '' }];
    this._userData = serve[0];
  }

  fetchUniforms(): void {
    const token = JSON.parse(localStorage.getItem('serverResponse') as string)
      ? JSON.parse(localStorage.getItem('serverResponse') as string)[1]
      : '';

    const options: any = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    this.apiService
      .getMultiple('school-uniform', options)
      .pipe(
        retry(1),
        tap((response: any) => {
          if (response.status === 'success' && response.data.length > 0) {
            this.uniforms = response.data;
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

  makeRequest() {
    const token = JSON.parse(localStorage.getItem('serverResponse') as string)
      ? JSON.parse(localStorage.getItem('serverResponse') as string)[1]
      : '';
    const options: any = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    const uniform = document.querySelector(`tr#uniform`)?.children;
    const uniformData: any = {};
    Array.of(uniform).forEach((item: any, index: any) => {
      const name: string = item?.item(index)?.getAttribute('name') || 'name';
      const id = item?.item(index)?.getAttribute('id');
      uniformData[name] = id;
    });
    uniformData.student_id = this._userData['student_id']

    this.apiService
      .post('school-uniform', JSON.stringify(uniformData), options)
      .pipe(
        retry(1),
        tap((response: any) => {
          if (response.status === 'success') {
            this.router.navigate(['payments']);
          }
        }),
        catchError(this.handleError)
      )
      .subscribe();
  }

  get userData(): Record<string, string> {
    return this._userData;
  }
  set userData(data: Record<string, string>) {
    this._userData = data;
  }

  decrease() {
    if (this.count >= 1) {
      this.count -= 1;
    }
  }

  increase() {
    this.count += 1;
  }

  selected(event: any) {
    const parentElement = event.target.parentElement;
    const children = parentElement.children;
    for (let child of children) {
      if (child.classList.contains('selected')) {
        child.classList.remove('selected');
      }
    }
    event.target.classList.add('selected');
    parentElement.id = event.target.name;
  }

  computedAmount(amount: string) {
    return Number(amount) * this.count;
  }
}
