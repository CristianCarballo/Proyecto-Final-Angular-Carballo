import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Session } from 'src/app/auth/views/sessions/models/session';
import { SessionService } from 'src/app/auth/views/sessions/services/session.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})

export class SidenavComponent implements OnInit, OnDestroy{
  
  session$!: Observable<Session>;
  subscription!: Subscription;
  session!: Session;

  constructor(private sessionService: SessionService) {

  }

  ngOnInit(): void {
    this.session$ = this.sessionService.getSessionData();
    this.subscription = this.session$.subscribe(
      (session: Session) => (this.session = session));
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
