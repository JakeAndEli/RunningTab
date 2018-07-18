import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AdminService {

  constructor(private http: HttpClient) { }

  getTabs(venueId) {
    return this.http.get('/api/tabs/' + venueId);
  }

  startNewTab(userId) {
    var venueId = JSON.parse(localStorage.getItem("user")).venueId;
    var data = {
      venueId: venueId,
      userId: userId
    };
    return this.http.post('/api/tab/', data)
  }

  getVenueInfo() {
    var venueId = JSON.parse(localStorage.getItem('user')).venueId;
    return this.http.get('api/venue/' + venueId );
  }

  getUserInfo(userId) {
    var userId = userId;
    return this.http.get('api/user/' + userId);
  }

  addItemsToTab(data) {
    return this.http.post('/api/addItems', data)
  }

}
