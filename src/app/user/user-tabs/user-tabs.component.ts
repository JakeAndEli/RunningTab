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
  private currentTabBeingClosed;

  constructor(private userService: UserService) {}

  ngOnInit() {

    this.userService.getActiveTabs().subscribe(
      (data: any) => {
        this.tabs = data.tabs;
        this.formatDate();
      }
    );

    this.setClickHandlers();
  }

  setClickHandlers() : void {
    $(window).click(function(event){
      var tipPopUp = document.getElementById("tip-pop-up-cont");
      if(event.target == tipPopUp) {
        $("#tip-pop-up-cont").addClass("hide");
      }
    });
  }

  formatDate(): void {
    for (var i = 0; i < this.tabs.length; i++) {

      var openedAt = new Date(this.tabs[i].openedAt);

      var year = openedAt.getFullYear().toString();
      var month = openedAt.getMonth() + 1;
      var day = openedAt.getDate();
      var hours = openedAt.getHours();
      var minutes = openedAt.getMinutes();
      var dd;

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

  showTipPopUp(event) {
    var tabIdClickedOn = $(event.target).closest(".tab-cont").attr("data-tabid");
    this.currentTabBeingClosed = this.tabs.find(function(tab) {
      return tab._id == tabIdClickedOn;
    });
    $("#tip-pop-up-cont").removeClass("hide");
  }

  closeTab(tabId): void {

    var data ={
      tabId : tabId
    };
    this.userService.closeTab(data).subscribe(
      (data: any) => {
        if (data.success === true) {
          $(".tab-cont").find(`[data-tabid='${tabId}']`).remove();
        } else {
         return;
        }
      }
    );
  }
}

