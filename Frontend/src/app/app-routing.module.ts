import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { Error404Component } from './error/error404/error404.component';
import { RestoreComponent } from './auth/restore/restore.component';

const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'restore/:token', component: RestoreComponent },
  { path: 'academic', loadChildren: () => import('./academics/academics.module').then( m => m.AcademicsModule ) },
  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
