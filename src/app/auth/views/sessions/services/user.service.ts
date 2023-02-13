import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environmentsPROD } from 'src/environments/environments.prod';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiURL = environmentsPROD.apiURL;
  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiURL}/users`)
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiURL}/users/${id}`)
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiURL}/users`, user);
  }
}
