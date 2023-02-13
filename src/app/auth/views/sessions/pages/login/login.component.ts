import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { User } from '../../models/user';
import { SessionService } from '../../services/session.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy{

  form: FormGroup;

  users!: User[];
  users$!: Observable<User[]>;
  subscription!: Subscription;

  validation!: User;

  constructor(
    private sessionService: SessionService,
    private router: Router,
    private userService: UserService
  ){
    this.form = new FormGroup({
      user: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.users$ = this.userService.getUsers();
    this.subscription = this.users$.subscribe(
      (users) => (this.users = users)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  userValidation() {
    const formUser = this.form.value.user;
    const formPassword = this.form.value.password;
    const findUser = this.users.find(
      (us) => us.user === formUser
    );

    if (findUser != undefined) {
      if (findUser.password === formPassword) {
        this.validation = findUser;
        this.sessionService.login(
          findUser.user,
          findUser.password,
          findUser.admin,
          findUser.id,
          findUser.name,
          findUser.img
        );
        this.router.navigate(['/students']);
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'contraseña incorrecta',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'usuario icorrecto',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
}
