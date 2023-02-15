import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit, OnDestroy {

  form: FormGroup;
  srcResult!: string;

  users!: User[];
  users$!: Observable<User[]>;
  subscription!: Subscription;

  constructor(
    private router: Router,
    private userService: UserService
  ) {
    this.form = new FormGroup({
      user: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.minLength(4), Validators.required,]),
      admin: new FormControl(),
      name: new FormControl(''),
      img: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.users$ = this.userService.getUsers();
    this.subscription = this.users$.subscribe(
      (user) => (this.users = user)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addUser() {
    let id: number = Math.max.apply(null,this.users.map((u) => u.id));

    const user: User = {
      id: id + 1,
      user: this.form.value.user,
      password: this.form.value.password,
      admin: this.form.value.admin,
      name: this.form.value.name,
      img: this.form.value.img
    };

    this.userService.addUser(user).subscribe(() => {
      this.router.navigate(['/sessions/login'])
    });
  }

  registerValidation() {

    const formUser = this.form.value.user;
    const findUser = this.users.find((el) => el.user === formUser);
    
    if (findUser === undefined) {
      this.addUser();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se agregó un nuevo usuario',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Lo sentimos el usuario ya se encuentra registrado',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');
  
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
      };
  
      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }
}
