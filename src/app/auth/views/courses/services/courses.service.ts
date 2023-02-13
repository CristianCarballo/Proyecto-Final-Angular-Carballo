import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, concatMap, throwError } from 'rxjs';
import { environments } from 'src/environments/environments';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private apiURL = environments.apiURL;
  
  constructor(private http: HttpClient) {

  }

  getCourses(): Observable<Course[]> {
    return this.http
      .get<Course[]>(`${this.apiURL}/courses`, {
        headers: new HttpHeaders({
          'content-type': 'application/json',
          encoding: 'Utf-8',
        }),
      })
      .pipe(catchError(this.errorManagement));
  }

  getCourse(id: number): Observable<Course> {
    return this.http
      .get<Course>(`${this.apiURL}/courses/${id}`, {
        headers: new HttpHeaders({
          'content-type': 'application/json',
          encoding: 'Utf-8',
        }),
      })
      .pipe(catchError(this.errorManagement));
  }

  addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(`${this.apiURL}/courses`, course).pipe(catchError(this.errorManagement))
  }

  editCourse(course: Course) {
    this.http
      .put<Course>(`${this.apiURL}/courses/${course.id}`, course)
      .pipe(catchError(this.errorManagement))
      .subscribe();
  }

  deleteCourse(id: number) {
    return this.http
      .delete<Course>(`${this.apiURL}/courses/${id}`)
      .pipe(concatMap(() => this.getCourses()));
  }


  private errorManagement(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.warn('error del lado del cliente', error.error.message);
    } else {
      console.warn('error del lado del servidor', error.error.message);
    }

    return throwError(() => new Error('error en la conmunicación HTTP'));
  }
}
