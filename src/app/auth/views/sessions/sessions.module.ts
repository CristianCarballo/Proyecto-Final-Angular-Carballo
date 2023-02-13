import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionsRoutingModule } from './sessions-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MaterialModule } from '../../shared/module/material.module';


@NgModule({
  declarations: [
    LoginComponent,
    NotFoundComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    SessionsRoutingModule,
    MaterialModule
  ]
})
export class SessionsModule { }
