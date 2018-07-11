import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MenuService {

  constructor(private http: HttpClient) { }

  addCategory(newCategory) {
    this.http.post('/api/category', newCategory)
  }

  addItem() {

  }

}
