import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component'
import { SignUpPickRoleComponent } from './sign-up-pick-role/sign-up-pick-role.component';
import { SignUpVenueInfoComponent } from './sign-up-venue-info/sign-up-venue-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpService } from '../services/sign-up.service';
import { AuthenticationService } from '../services/authenticate.service';

import { routing } from '../app.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routing),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [SignUpComponent, SignInComponent, SignUpPickRoleComponent, SignUpVenueInfoComponent],
  exports: [SignInComponent, SignUpComponent, SignUpPickRoleComponent, SignUpVenueInfoComponent],
  providers: [AuthenticationService, SignUpService]
})
export class LoginModule { }
