import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string) : Observable<any> {
    return this.http.post<any>('/api/authenticate', { username: username, password: password });
  }

  signUp(username: string, password: string) {
    return this.http.post<any>('/api/register', { username: username, password: password });
  }

  /*logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }*/
}
