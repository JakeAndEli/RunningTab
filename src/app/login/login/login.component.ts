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

  public username : String;
  public password : String;

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

  validateLogin(username: string, password: string) : void {

    this.authService.login(username, password).subscribe(
      (response: any) => {
        if(response.success && response.token) {
          this.router.navigate(['user']);
          console.log(response);
        } else {
          alert("Error: " + response.msg);
        }
      }
    )
  }

  validateSignUp(username: string, password: string, confirmPassword: string) : void {

    // Check to make sure password and confirm password are same and other password validation

    this.authService.signUp(username, password).subscribe(
      (response: any) => {
        if(response.success && response.token) {
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          this.router.navigate(['user']);
          console.log(response);
        } else {
          alert("Error: " + response.msg);
        }
      }
    )
  }

}
