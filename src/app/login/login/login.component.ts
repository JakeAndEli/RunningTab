import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { AuthenticationService } from '../../services/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthenticationService]
})
export class LoginComponent implements OnInit {

  public loginUsername : String;
  public loginPassword : String;
  public signupUsername : String;
  public signupPassword : String;
  public signupConfirmPassword : String;

  constructor(private router: Router,
              private authService : AuthenticationService){}

  ngOnInit() {

    this.setClickHandlers();

  }

  setClickHandlers() : void {
    var thisClass = this;

    $(document).ready(function(){
      $("#login-form-link").click(function(){
        $("#login-form").show();
        $("#register-form").hide();
        $("#sign-up-form-link").removeClass("active");
        $(this).addClass("active");
      });
      $("#sign-up-form-link").click(function(){
        $("#register-form").show();
        $("#login-form").hide();
        $("#login-form-link").removeClass("active");
        $(this).addClass("active");
      });
    });

  }

  validateLogin() : void {

    const user = {
      username: this.loginUsername,
      password: this.loginPassword
    };

    this.authService.login(user).subscribe(
      (data: any) => {
        if(data.success) {
          this.authService.storeUserData(data.token, data.user);
          this.router.navigate(['user']);
        } else {
          alert("Error: " + data.msg);
          this.router.navigate(['login']);
        }
      }
    )
  }

  validateSignUp() : void {

    const user = {
      username: this.signupUsername,
      password: this.signupPassword
    };

    // Check to make sure password and confirm password are same and other password validation

    this.authService.signUp(user).subscribe(
      (data: any) => {
        if(data.success) {
          this.authService.storeUserData(data.token, data.user);
          this.router.navigate(['user']);
        } else {
          alert("Error: " + data.msg);
          this.router.navigate(['login']);
        }
      }
    )
  }

}
