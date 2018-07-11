import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authenticate.service';
import { SignUpService } from '../../services/sign-up.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-venue-info',
  templateUrl: './sign-up-venue-info.component.html',
  styleUrls: ['./sign-up-venue-info.component.css'],
  providers: []
})
export class SignUpVenueInfoComponent implements OnInit {

  public username : String;
  public password : String;
  public venueName : String;
  public venueTownCity : String;
  public venueState : String;

  constructor(private router: Router,
              private authService : AuthenticationService,
              private signUpService : SignUpService){}

  ngOnInit() {

  }

  validateAdminSignUp() : void {

    // Check to make sure all info is here before continuing

    const admin = {
      username: this.signUpService.getUsername(),
      password: this.signUpService.getPassword(),
      isAdmin: true,
      venueName: this.venueName,
      venueTownCity: this.venueTownCity,
      venueState: this.venueState
    };

    this.authService.signUp(admin).subscribe(
      (data: any) => {
        if(data.success) {
          this.authService.storeAccountData(data.token, data.user);
          this.router.navigate(['admin']);
        } else {
          alert("Error: " + data.msg);
        }
      }
    )
  }

}
