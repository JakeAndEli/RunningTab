import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import * as $ from 'jquery';

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

    this.userService.getActiveTabs().subscribe(
      (data: any) => {
        this.tabs = data.tabs;

        this.formatDate();
      }
    );
  }

  formatDate(): void {
    for (var i = 0; i < this.tabs.length; i++) {
      console.log(this.tabs[i].openedAt);
      var openedAt = new Date(this.tabs[i].openedAt);

      var year = openedAt.getFullYear();
      var month = openedAt.getMonth() + 1;
      var day = openedAt.getDate();
      var hours = openedAt.getHours();
      var minutes = openedAt.getMinutes();
      var dd = 'AM';

      if (day < 10) {
        String day = (String)('0' + day);
      }
      if (month < 10) {
        String month = (String)('0' + month);
      }
      if (hours < 12) {
        dd = 'AM';
      }
      if (hours > 12) {
        dd = 'PM';
        String hours = (String)(hours - 12);
      }
      if (minutes < 10) {
        String minutes = (String)('0' + minutes);
      }

      var formatedDate = hours + ':' + minutes + ' ' + dd + '  ' + month + '/' + day + '/' + year;

      this.tabs[i].openedAt = formatedDate;
    }
  }

  closeTab(event): void {
    var tabid = $(event.target).closest('.tab-cont').attr('data-tabid');
    var tab = $(event.target).closest('.tab-cont');
    this.userService.closeTab(tabid).subscribe(
      (data: any) => {
        if (data.success === true) {
          tab.remove();
        } else {
         return;
        }
      }
    );
  }
}

