import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription, Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { InscriptionsService } from '../../services/inscriptions.service';
import { SessionService } from '../../../sessions/services/session.service';
import { Inscription } from '../../models/inscription';
import { Session } from '../../../sessions/models/session';

@Component({
  selector: 'app-inscription-list',
  templateUrl: './inscription-list.component.html',
  styleUrls: ['./inscription-list.component.css']
})
export class InscriptionListComponent implements OnInit, OnDestroy {

  constructor(
    private inscriptionsService: InscriptionsService,
    private sessionService: SessionService
    ) {}

  displayedColumns: string[] = [
    'id',
    'code',
    'student',
    'date',
    'course',
    'delete'
  ];

  dataSource!: MatTableDataSource<Inscription>;

  inscriptions!: Inscription[];
  inscriptionSubscription!: Subscription;
  inscription$!: Observable<Inscription[]>;

  session$!: Observable<Session>;
  sessionSubscription!: Subscription;
  session!: Session;

  ngOnInit(): void {
    this.inscription$ = this.inscriptionsService.getInscriptions();
    this.inscriptionSubscription = this.inscription$.subscribe((inscriptions: Inscription[]) => {
      this.inscriptions = inscriptions
    })

    this.session$ = this.sessionService.getSessionData();
    this.sessionSubscription = this.session$.subscribe(
      (session: Session) => (this.session = session));

    this.dataSource = new MatTableDataSource<Inscription>(this.inscriptions)
  }

  ngOnDestroy(): void {
    this.inscriptionSubscription.unsubscribe();
    this.sessionSubscription.unsubscribe();
  }

  deleteInscription(inscription: Inscription) {
    this.inscriptionsService.deleteInscriptions(inscription).subscribe(() => {
      this.inscription$ = this.inscriptionsService.getInscriptions();
    })
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Se eliminó correctamente',
      showConfirmButton: false,
      timer: 1500,
    });
  }

}
