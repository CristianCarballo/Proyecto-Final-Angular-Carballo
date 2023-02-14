import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environments';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Inscription } from '../models/inscription';

@Injectable({
  providedIn: 'root'
})
export class InscriptionsService {

  private apiURL = environments.apiURL;

  constructor(private http: HttpClient) {

  }

  getInscriptions(): Observable<Inscription[]>{
    return this.http.get<Inscription[]>(`${this.apiURL}/inscriptions`).pipe(catchError(this.errorManagement))
  }

  addInscriptions(inscriptions: Inscription):Observable<Inscription>{
    return this.http.post<Inscription>(`${this.apiURL}/inscriptions`, inscriptions).pipe(catchError(this.errorManagement))
  }

  deleteInscriptions(inscription: Inscription):Observable<Inscription>{
    return this.http.delete<Inscription>(`${this.apiURL}/inscriptions/${inscription.id}`).pipe(catchError(this.errorManagement));
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
