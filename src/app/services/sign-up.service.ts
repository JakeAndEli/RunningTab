import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SignUpService {

  private username : String;
  private password : String;
  private venueName : String;
  private venueTownCity : String;
  private venueState : String;

  constructor() {}

  setUsername(username) {
    this.username = username;
  }
  setPassword(password) {
    this.password = password;
  }

  getUsername() {
    return this.username;
  }
  getPassword() {
    return this.password;
  }
}
