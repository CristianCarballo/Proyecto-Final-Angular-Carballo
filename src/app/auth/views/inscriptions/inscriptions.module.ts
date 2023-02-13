import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/module/material.module';
import { PipeModule } from '../../shared/pipes/pipe.module';
import { InscriptionFormComponent } from './pages/inscription-form/inscription-form.component';
import { InscriptionListComponent } from './pages/inscription-list/inscription-list.component';
import { InscriptionsRoutingModule } from './inscriptions-routing.module';


@NgModule({
  declarations: [
    InscriptionFormComponent,
    InscriptionListComponent
  ],
  imports: [
    CommonModule,
    InscriptionsRoutingModule,
    MaterialModule,
    PipeModule
  ]
})
export class InscriptionsModule { }
