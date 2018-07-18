import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-user-tabs',
  templateUrl: './user-tabs.component.html',
  styleUrls: ['./user-tabs.component.css']
})
export class UserTabsComponent implements OnInit {

  private tabs;

  constructor(private userService: UserService) {
  }

  ngOnInit() {

    this.userService.getTabs().subscribe(
      (data: any) => {
        console.log(data);
        this.tabs = data.tabs;

      }
    );

  }
}
