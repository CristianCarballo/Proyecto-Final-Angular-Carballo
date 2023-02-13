import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionListComponent } from './pages/inscription-list/inscription-list.component';
import { InscriptionFormComponent } from './pages/inscription-form/inscription-form.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:'',
        component: InscriptionListComponent
      },
      {
        path:'form',
        component: InscriptionFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InscriptionsRoutingModule { }
