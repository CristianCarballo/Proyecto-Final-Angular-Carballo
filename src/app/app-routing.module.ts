import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminlayoutComponent } from './auth/shared/components/layouts/adminlayout/adminlayout.component';
import { AuthlayoutComponent } from './auth/shared/components/layouts/authlayout/authlayout.component';
import { AuthGuard } from './auth/shared/guard/auth.guard';
import { PublicLayoutComponent } from './public/shared/components/layout/public-layout/public-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'app/home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: 'app',
        loadChildren: () => import('./public/views/home/home.module').then(m => m.HomeModule)
      }
    ]
  },
  {
    path: '',
    component: AuthlayoutComponent,
    children: [
      {
        path: 'sessions',
        loadChildren: () => import('./auth/views/sessions/sessions.module').then(m => m.SessionsModule)
      }
    ]
  },
  {
    path: '',
    component: AdminlayoutComponent,
    canActivate:[AuthGuard],
    children: [
      {
        path: 'students',
        loadChildren: () => import('./auth/views/students/students.module').then(m => m.StudentsModule)
      },
      {
        path: 'courses',
        loadChildren: () => import('./auth/views/courses/courses.module').then(m => m.CoursesModule)
      },
      {
        path:'inscriptions',
        loadChildren: () => import('./auth/views/inscriptions/inscriptions.module').then(m => m.InscriptionsModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'sessions/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
