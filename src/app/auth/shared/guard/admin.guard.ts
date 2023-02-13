import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Session } from '../../views/sessions/models/session';
import { SessionService } from '../../views/sessions/services/session.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private sessionService: SessionService,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.sessionService.getSessionData().pipe(
      map((session: Session) => {
        if (session.userActive?.admin) {
          return true;
        }
        else {
          return false;
        }
      })
    )
  }

}
