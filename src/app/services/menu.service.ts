import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MenuService {

  constructor(private http: HttpClient) { }

  getFullMenu() : Observable<any> {
    var userString = localStorage.getItem("user");
    var userJSON = JSON.parse(userString);
    var venueId = userJSON.venueId;
    return this.http.get('/api/fullMenu/' + venueId)
  }

  addCategory(newCategory) : Observable<any> {
    return this.http.post('/api/menuCategory/', newCategory)
  }

  addItem(newItem) {
    return this.http.post('/api/item', newItem)
  }

  removeItem(data) {
    return this.http.post('api/removeItem', data);
  }

}
