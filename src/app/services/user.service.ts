import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class UserService {

  constructor(private http: HttpClient) { }

  getTabs() : Observable<any>{
    var userString = localStorage.getItem("user");
    var userJSON = JSON.parse(userString);
    console.log(userJSON);
    return this.http.get('/api/tabs/user/' + userJSON.id);
  }


}
