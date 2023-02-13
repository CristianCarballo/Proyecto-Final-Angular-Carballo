import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Session } from '../models/session';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  sessionSubject: BehaviorSubject<Session>;

  constructor() {
    const session: Session = {
      isLogin: false,
    };
    this.sessionSubject = new BehaviorSubject(session);
  }

  login(user: string, password: string, admin: boolean, id: number, name: string, img: string) {
    const session: Session = {
      isLogin: true,
      userActive: {
        id: id,
        user: user,
        password: password,
        admin: admin,
        name: name,
        img: img
      },
    };
    this.sessionSubject.next(session);
  }

  getSessionData(): Observable<Session> {
    return this.sessionSubject.asObservable();
  }

  clearToken(){
    return sessionStorage.setItem("token",'')
  }
}
