import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import * as $ from 'jquery';
import { AuthenticationService } from '../../services/authenticate.service';

@Component({
  selector: 'app-admin-past-bills',
  templateUrl: './admin-past-bills.component.html',
  styleUrls: ['./admin-past-bills.component.css']
})
export class AdminPastBillsComponent implements OnInit {
  private tabs;

  constructor(private adminService:AdminService,
              private authService : AuthenticationService) {
  }

  ngOnInit() {
    this.authService.getAdminPastBills().subscribe(
      (data: any) => {
        this.adminService.getPastTabs().subscribe(
          (data:any) => {
            this.tabs = data.tabs;

            for (var i = 0; i < this.tabs.length; i++) {
              var openedAt = this.formatDate(this.tabs[i].openedAt);
              var closedAt = this.formatDate(this.tabs[i].closedAt);
              this.tabs[i].openedAt = openedAt;
              this.tabs[i].closedAt = closedAt;
              this.tabs[i].total = (parseFloat(this.tabs[i].total)).toFixed(2);
              this.tabs[i].tip = (parseFloat(this.tabs[i].tip)).toFixed(2);
              this.tabs[i].totalAfterTip = ((this.tabs[i].total * 1) + (this.tabs[i].tip * 1)).toFixed(2);
            }
          }
        );
      }
    )
  }

  toggleArrow(event) : void{
    var clickedTabElement = $(event.target).closest(".tab-cont");
    $(clickedTabElement).find(".items").slideToggle("400");
    $(clickedTabElement).find(".sub-total-cont").slideToggle("400");
    $(clickedTabElement).find(".tip-cont").slideToggle("400");
    $(clickedTabElement).find(".total-cont").slideToggle("400");
    $(clickedTabElement).find(".arrow-icon").toggleClass('flip');
  }

  formatDate(date):String {
    var newDate = new Date(date);
    var year = newDate.getFullYear().toString();
    var month = newDate.getMonth() + 1;
    var day = newDate.getDate();
    var hours = newDate.getHours();
    var minutes = newDate.getMinutes();
    var dd;

    if (day < 10) {
      var dayString = day.toString();
      dayString = '0' + dayString;
    }
    if (day > 10) {
      var dayString = day.toString();
    }
    else if (day >= 10) {
      var dayString = day.toString();

    }
    if (month < 10) {
      var monthString = month.toString();
      monthString = '0' + monthString;
    }
    else if (month >= 10){
      var monthString = month.toString();
    }
    if (hours < 12) {
      dd = 'AM';
      var hoursString = hours.toString();
    }
    else if (hours > 12) {
      dd = 'PM';
      var hoursString = (hours - 12).toString();
    }
    else if (hours == 12){
      dd = 'PM';
      var hoursString = hours.toString();
    }
     if (hours < 1){
      dd = 'AM';
    }
    if (minutes < 10) {
      var minutesString = minutes.toString();
      minutesString = '0' + minutesString;
    }
    else if (minutes >= 10) {
      var minutesString = minutes.toString();
    }

    return hoursString + ':' + minutesString + ' ' + dd + '  ' + monthString + '/' + dayString + '/' + year;
  }

}
