import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authenticate.service';
import { SignUpService } from '../../services/sign-up.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: []
})
export class SignUpComponent implements OnInit {

  public username : String;
  public password : String;
  public confirmPassword : String;

  constructor(private router: Router,
              private authService : AuthenticationService,
              private signUpService : SignUpService){}

  ngOnInit() {
  }

  routeToPickRole() {
    // Check to make sure password and confirm password are same and other password validation
    // ie: username isn't taken
    this.signUpService.setUsername(this.username);
    this.signUpService.setPassword(this.password);
    this.router.navigate(['/signup-pick-role']);
  }

}
