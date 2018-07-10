import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { routing } from '../app.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routing),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export class LoginModule { }
