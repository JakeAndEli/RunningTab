import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    this.setClickHandlers();

  }

  setClickHandlers() : void {

    $(document).ready(function(){
      $("#login-form-link").click(function(){
        $("#login-form").show();
        $("#register-form").hide();
      });
      $("#sign-up-form-link").click(function(){
        $("#register-form").show();
        $("#login-form").hide();
      });
    });

  }

}
