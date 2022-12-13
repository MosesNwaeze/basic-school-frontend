import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApplicationApiService {
  private baseUrl = 'http://localhost:3000/schools/api/v1';

  erroStatus = false;
  errorMessage: any = [];

  private responseData: Record<string, string>[] = [];

  constructor(private http: HttpClient) {}

  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      //console.error('An error occurred:', error.error);
      this.errorMessage.push(error.error);
    } else {
      // console.error(
      //   `Backend returned code ${error.status}, body was: `,
      //   error.error
      // );
      this.errorMessage.push(error.error.message);
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

  post(uri: string, data: Object, options: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/${uri}`, data, options);
    //.pipe(retry(3), catchError(this.handleError));
  }

  loginRegister(uri: string, data: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/${uri}`, data);
  }

  getSingle(uri: string, id: string, options: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${uri}/${id}`, options);
    //.pipe(retry(3), catchError(this.handleError));
  }

  update(
    uri: string,
    id: string,
    data: Object,
    options: any
  ): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${uri}/${id}`, data, options);
    //.pipe(retry(3), catchError(this.handleError));
  }

  getMultiple(uri: string, options: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${uri}`, options);
    //.pipe(retry(3), catchError(this.handleError));
  }

  getTimeTable(
    uri: string,
    studentClass: string,
    timeOfTheDay: string,
    options: any
  ) {
    return this.http.get(
      `${this.baseUrl}/${uri}/${studentClass}/${timeOfTheDay}`,
      options
    );
  }

  delete(uri: string, id: string, options: any): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/${uri}/${id}`, options);
    //.pipe(retry(3), catchError(this.handleError));
  }

  entranceStudentGetMultiple(uri: string): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${uri}`, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  entranceStudentPost(uri: string, data: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/${uri}`, data, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  entranceStudentGet(uri: string, pathVariable: string): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${uri}/${pathVariable}`, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  entranceStudentPut(
    uri: string,
    pathVariable: string,
    data: Object
  ): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${uri}/${pathVariable}`, data, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  entranceStudentDelete(uri: string, pathVariable: string): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/${uri}/${pathVariable}`, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  setResponseData(data: Record<string, string>[]) {
    this.responseData = data;
  }

  getResponseData() {
    return this.responseData;
  }
}
