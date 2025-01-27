import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FichaComponent } from './pages/ficha/ficha.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: ':id',
    component: FichaComponent,
  }
];

@NgModule({
  declarations: [
    FichaComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule
  ]
})
export class FichaModule { }
