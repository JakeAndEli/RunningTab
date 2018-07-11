import { Component, OnInit } from '@angular/core';
import { SignUpService } from '../../services/sign-up.service';
import { AuthenticationService } from '../../services/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-pick-role',
  templateUrl: './sign-up-pick-role.component.html',
  styleUrls: ['./sign-up-pick-role.component.css'],
  providers: []
})
export class SignUpPickRoleComponent implements OnInit {

  public isAdmin : String = "false";

  constructor(private router: Router,
              private authService : AuthenticationService,
              private signUpService : SignUpService) { }

  ngOnInit() {

  }

  routeToNext() {
    var boolValue = (this.isAdmin == "false");
    if(boolValue) {
      this.validateUserSignUp()
    } else {
      this.router.navigate(['/signup-venue-info']);
    }
  }

  validateUserSignUp() {

    // Check to make sure all info is here before continuing

    const user = {
      username: this.signUpService.getUsername(),
      password: this.signUpService.getPassword(),
      isAdmin: false
    };

    this.authService.signUp(user).subscribe(
      (data: any) => {
        if(data.success) {
          this.authService.storeAccountData(data.token, data.user);
          this.router.navigate(['user']);
        } else {
          alert("Error: " + data.msg);
        }
      }
    )
  }

}
