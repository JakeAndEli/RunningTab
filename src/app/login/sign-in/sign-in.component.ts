import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers: [AuthenticationService]
})
export class SignInComponent implements OnInit {

  public username : String;
  public password : String;

  constructor(private router: Router,
              private authService : AuthenticationService){}

  ngOnInit() {
  }

  validateSignIn() : void {

    const user = {
      username: this.username,
      password: this.password
    };

    this.authService.signIn(user).subscribe(
      (data: any) => {
        if(data.success) {
          this.authService.storeAccountData(data.token, data.user);
          var isAdmin = data.user.admin;
          if(isAdmin) {
            this.router.navigate(['admin']);
          } else {
            this.router.navigate(['user']);
          }
        } else {
          alert("Error: " + data.msg);
          this.router.navigate(['signin']);
        }
      }
    )
  }

}
