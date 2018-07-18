import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class SignUpService {



  private username : String;
  private fullName : String;
  private password : String;
  private venueName : String;
  private venueTownCity : String;
  private venueState : String;

  constructor(private http: HttpClient) { }

  setUsername(username) {
    this.username = username;
  }

  setFullName(fullName) {
    this.fullName = fullName;
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
  getFullName() {
    return this.fullName;
  }

  checkUsername(username): Observable<any> {
    return this.http.get('/api/checkForUserName/' + username);
  }
}
