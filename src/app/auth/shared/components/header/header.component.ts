import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Session } from 'src/app/auth/views/sessions/models/session';
import { SessionService } from 'src/app/auth/views/sessions/services/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{


  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  session$!: Observable<Session>;
  subscription!: Subscription;
  session!: Session;

  constructor(
    private router: Router,
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
    this.session$ = this.sessionService.getSessionData();
    this.subscription = this.session$.subscribe(
      (session: Session) => (this.session = session));
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  logOut() {
    this.session.isLogin = false;
    this.session.userActive = {
      admin: false,
      id: -1,
      password: '',
      user: '',
      name: '',
      img: '',
    };
    this.router.navigate(['/sessions/login']);
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
