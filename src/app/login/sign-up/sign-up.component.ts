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
  public fullName : String;
  public password : String;
  public confirmPassword : String;

  constructor(private router: Router,
              private authService : AuthenticationService,
              private signUpService : SignUpService){}

  ngOnInit() {
  }

  routeToPickRole() {
    // Check to make sure password and confirm password are same and other password validation

    if (!this.username) {
      alert('Username is blank');
      return;
    }
    if (!this.fullName) {
      alert('Full Name is blank');
      return;
    }
    if ( !this.password || this.password.length <= 7 ) {
      alert('Password must be 8 characters or more');
      return;
    }
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    this.signUpService.checkUsername(this.username).subscribe(
      (data: any) => {
        if (data.exists === true) {
          alert('This username already exists please try something else');
          return;
        } else {
            this.signUpService.setUsername(this.username);
            this.signUpService.setFullName(this.fullName);
            this.signUpService.setPassword(this.password);
            this.router.navigate(['/signup-pick-role']);
        }
      }
    );
  }

}
