import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import * as $ from 'jquery';
import { AuthenticationService } from '../../services/authenticate.service';

@Component({
  selector: 'app-user-tabs',
  templateUrl: './user-tabs.component.html',
  styleUrls: ['./user-tabs.component.css']
})
export class UserTabsComponent implements OnInit {

  private tabs;
  private currentTabBeingClosed;
  private tipPercent = 20;
  private tipAmount;
  private totalAfterTip;

  constructor(private userService: UserService,
              private authService : AuthenticationService) {}

  ngOnInit() {
    this.authService.getUserTabs().subscribe(
      (data: any) => {
        this.userService.getActiveTabs().subscribe(
          (data: any) => {
            this.tabs = data.tabs;
            this.formatDate();
            this.findTotals();
          }
        );
      }
    );

    this.setClickHandlers();
  }

  setClickHandlers() : void {
    var thisClass = this;
    $(window).click(function(event){
      var tipPopUp = document.getElementById("tip-pop-up-cont");
      if(tipPopUp) {
        var tipPopUpRow = tipPopUp.querySelector(".row");
      }
      if(event.target == tipPopUp || event.target == tipPopUpRow) {
        thisClass.currentTabBeingClosed = false;
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
      if (hours < 1) {
        dd = 'AM';
      }
      if (minutes < 10) {
        var minutesString = minutes.toString();
        minutesString = '0'+ minutesString;
      }
      else if (minutes >= 10) {
        var minutesString = minutes.toString();
      }

      var formatedDate = hoursString + ':' + minutesString + ' ' + dd + '  ' + monthString + '/' + dayString + '/' + year;

      this.tabs[i].openedAt = formatedDate;
    }
  }

  findTotals() : void {

    var currentTab, currentItem;
    var total;

    for(var i = 0; i < this.tabs.length; i++) {
      currentTab = this.tabs[i];
      total = 0;

      for(var j = 0; j < currentTab.items.length; j++) {
        currentItem = currentTab.items[j];
        total += parseFloat(currentItem.price);
      }

      this.tabs[i].total = total.toFixed(2);

    }
  }

  showTipPopUp(event) {
    var tabIdClickedOn = $(event.target).closest(".tab-cont").attr("data-tabid");
    this.currentTabBeingClosed = this.tabs.find(function(tab) {
      return tab._id == tabIdClickedOn;
    });
    this.tipAmount = (this.currentTabBeingClosed.total * .2).toFixed(2);
    this.totalAfterTip = ((this.currentTabBeingClosed.total * 1) + (this.tipAmount * 1)).toFixed(2);
  }

  closeTab(tabId): void {
    var totalBeforeTip = $(".total-before-tip-amount").text();
    var tipAmount = $(".add-tip-amount").text();
    var data = {
      tabId : tabId,
      total: totalBeforeTip,
      tip: tipAmount
    };
    this.userService.closeTab(data).subscribe(
      (data: any) => {
        if (data.success === true) {
          $("#user-tabs-cont").find(`[data-tabid='${tabId}']`).remove();
          this.currentTabBeingClosed = false;
        } else {
         return;
        }
      }
    );
  }

  tipChanged(event) : void {
    this.tipAmount = (this.currentTabBeingClosed.total * (this.tipPercent / 100)).toFixed(2);
    this.totalAfterTip = ((this.currentTabBeingClosed.total * 1) + (this.tipAmount * 1)).toFixed(2);
  }
}

