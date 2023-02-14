import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environments } from 'src/environments/environments';
import { Student } from '../model/student';

@Injectable({
  providedIn: 'root'
})

export class StudentService {

  private apiURL = environments.apiURL;

  constructor(private http: HttpClient) {

  }

  getStudent(): Observable<Student[]>{
    return this.http.get<Student[]>(`${this.apiURL}/students`).pipe(catchError(this.errorManagement));
  }

  addStudent(student: Student) : Observable<Student> {
    return this.http.post<Student>(`${this.apiURL}/students`, student).pipe(catchError(this.errorManagement));
  }

  deleteStudent(student: Student) : Observable<Student> {
    return this.http.delete<Student>(`${this.apiURL}/students${student.id}`).pipe(catchError(this.errorManagement));
  }

  editStudent(student: Student) : Observable<Student> {
    return this.http.put<Student>(`${this.apiURL}/students${student.id}`, student).pipe(catchError(this.errorManagement));
  }

  private errorManagement(error: HttpErrorResponse) {
    
    if (error.error instanceof ErrorEvent) {
      console.warn('error del lado del cliente', error.error.message);
    } else {
      console.warn('error del lado del servidor', error.error.message);
    }

    return throwError(() => new Error('error en la conmunicacion HTTP'));
  }
}
