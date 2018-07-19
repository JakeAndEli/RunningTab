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

      var year = openedAt.getFullYear().toString();
      var month = openedAt.getMonth() + 1;
      var day = openedAt.getDate();
      var hours = openedAt.getHours();
      var minutes = openedAt.getMinutes();
      var dd = 'AM';

      if (day < 10) {
         var dayString = day.toString();
         dayString = '0' + dayString;

      }
      if (day > 10) {
        var dayString = day.toString();

      }
      if (month < 10) {
        var monthString = month.toString();
        monthString = '0' + monthString;
      }
      if (month > 10){
        var monthString = month.toString();
      }
      if (hours < 12) {
        dd = 'AM';
        var hoursString = hours.toString();
      }
      if (hours > 12) {
        dd = 'PM';
         var hoursString = (hours - 12).toString();
      }
      if (minutes < 10) {
        var minutesString = minutes.toString();
        minutesString = '0'+ minutesString;
      }
      if (minutes > 10) {
        var minutesString = minutes.toString();
      }

      var formatedDate = hoursString + ':' + minutesString + ' ' + dd + '  ' + monthString + '/' + dayString + '/' + year;

      this.tabs[i].openedAt = formatedDate;
    }
  }

  closeTab(event): void {
    var tabid = $(event.target).closest('.tab-cont').attr('data-tabid');
    var tab = $(event.target).closest('.tab-cont');
    var data ={
      tabId : tabid
    };
    this.userService.closeTab(data).subscribe(
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

