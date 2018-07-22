import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthenticationService {
  authToken: any;
  user: any;

  constructor(private http: HttpClient) { }

  signIn(user) {
    return this.http.post('/api/authenticate', user);
  }

  signUp(user) {
    return this.http.post('/api/register', user);
  }

  getUserHome() {
    this.loadToken();
    let headers = new HttpHeaders({
      'Authorization': this.authToken
    });
    return this.http.get('/user-home', {headers: headers});
  }

  getUserTabs() {
    this.loadToken();
    let headers = new HttpHeaders({
      'Authorization': this.authToken
    });
    return this.http.get('/user-tabs', {headers: headers});
  }

  getUserAccountManagement() {
    this.loadToken();
    let headers = new HttpHeaders({
      'Authorization': this.authToken
    });
    return this.http.get('/user-account-management', {headers: headers});
  }

  getAdminOpenBills() {
    this.loadToken();
    let headers = new HttpHeaders({
      'Authorization': this.authToken
    });
    return this.http.get('/admin-open-bills', {headers: headers});
  }

  getAdminPastBills() {
    this.loadToken();
    let headers = new HttpHeaders({
      'Authorization': this.authToken
    });
    return this.http.get('/admin-past-bills', {headers: headers});
  }

  getAdminScanQR() {
    this.loadToken();
    let headers = new HttpHeaders({
      'Authorization': this.authToken
    });
    return this.http.get('/admin-scan-qr', {headers: headers});
  }

  getAdminMenu() {
    this.loadToken();
    let headers = new HttpHeaders({
      'Authorization': this.authToken
    });
    return this.http.get('/admin-menu', {headers: headers});
  }

  getAdminProfile() {
    this.loadToken();
    let headers = new HttpHeaders({
      'Authorization': this.authToken
    });
    return this.http.get('/admin-profile', {headers: headers});
  }

  storeAccountData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
