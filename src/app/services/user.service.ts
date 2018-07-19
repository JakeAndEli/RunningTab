import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class UserService {

  constructor(private http: HttpClient) { }

  //get active tabs
  getActiveTabs() : Observable<any>{
    var userString = localStorage.getItem("user");
    var userJSON = JSON.parse(userString);
    return this.http.get('/api/tabs/active/user/' + userJSON.id);
  }

  closeTab(tabId) {
    return this.http.post('/api/closeTab/' + tabId);

  }


}
