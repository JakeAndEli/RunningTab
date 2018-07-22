import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authenticate.service';
import { MenuService } from '../../services/menu.service';
import { AdminService } from '../../services/admin.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-admin-open-bills',
  templateUrl: './admin-open-bills.component.html',
  styleUrls: ['./admin-open-bills.component.css'],
  providers: [AuthenticationService]
})
export class AdminOpenBillsComponent implements OnInit {

  private tabs;
  private categories;
  private currentTabId;
  private showPopUpHTML;

  private tempItems;

  constructor(private authService : AuthenticationService,
              private adminService : AdminService,
              private menuService : MenuService) {}

  ngOnInit() {

    this.authService.getAdminOpenBills().subscribe(
      (data: any) => {
        if(data.success) {
          this.tempItems = [];
          this.showPopUpHTML = false;

          this.adminService.getActiveTabs().subscribe(
            (data:any) => {
              this.tabs = data.tabs;
              this.formatDate();
              //this.organizeTabs();
              this.findTotals();
            }
          );
          this.menuService.getFullMenu().subscribe(
            (data: any) => {
              if(data.success) {
                this.categories = data.venue[0].menuId.menuCategoryId;
              }
            }
          );

          this.setClickHandlers();
        }
      }
    );
  }

  // Might eventually be used to group items so that they could say "x2 or x3"
  organizeTabs() : void {

    var tabObj = {};
    var currentTabId;
    var currentItem;

    for(var i = 0; i < this.tabs.length; i++) {
      currentTabId = this.tabs[i]._id;
      tabObj[currentTabId] = {};

      for(var j = 0; j < this.tabs[i].items.length; j++) {
        currentItem = this.tabs[i].items[j];

        if(tabObj[currentTabId][currentItem._id]) {
          tabObj[currentTabId][currentItem._id]["count"]++;
        } else {
          tabObj[currentTabId][currentItem._id] = {};
          tabObj[currentTabId][currentItem._id]["count"] = 1;
          tabObj[currentTabId][currentItem._id]["name"] = currentItem.name;
          tabObj[currentTabId][currentItem._id]["price"] = currentItem.price;
        }

      }
    }
  }

  formatDate(): void {
    for (var i = 0; i < this.tabs.length; i++) {
      var openedAt = new Date(this.tabs[i].openedAt);
      var year = openedAt.getFullYear().toString();
      var month = openedAt.getMonth() + 1;
      var day = openedAt.getDate();
      var hours = openedAt.getHours();
      var minutes = openedAt.getMinutes();
      var dd = '';

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
      else if (month >= 10) {
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

  setClickHandlers() : void {
    var thisClass = this;
    $(window).click(function(event){
      var addItemPopUp = document.getElementById("add-item-pop-up");
      if(event.target == addItemPopUp) {
        thisClass.exitPopUp();
      }
    });
  }

  showPopUp(event) : void {
    this.currentTabId = $(event.target).closest(".tab-cont").attr("data-tabid");
    this.showPopUpHTML = true;
  }

  showItemsForCategory(category) : void{
    var categoryId = category._id;
    $("#category-holder").addClass("hide");
    $("#item-holder").removeClass("hide");
    $("#pop-up-header-text").html(category.name + " Items");

    var allItems = $(".add-item-cont");
    for(var i = 0; i < allItems.length; i++) {
      if($(allItems[i]).attr("data-menucategoryid") == categoryId) {
        $(allItems[i]).removeClass("hide");
        $(allItems[i]).closest(".my-col").removeClass("hide");
      }
    }
  }

  addItem(item) {
    this.tempItems.push(item);
  }

  deleteTempItem(event) {
    $(event.target).closest(".item-on-tab").remove();
  }

  saveItemsToTab() : void {
    var items = [];
    var itemsInDom = $(".item-on-tab");
    for(var i = 0; i < itemsInDom.length; i++) {
      items.push($(itemsInDom[i]).attr("data-itemid"));
    }
    var data = {
      tabId: this.currentTabId,
      items: items
    };
    this.adminService.addItemsToTab(data).subscribe(
      (data: any) => {
        if(data.success) {
          alert("These items have been added to this tab!");
          this.exitPopUp();
          this.ngOnInit();
        }
      }
    );
  }

  // Should be more secure in future, users could change html to change total
  closeTab(event) : void {

    var tabCont = $(event.target).closest(".tab-cont");
    var tabId = $(tabCont).attr("data-tabId");
    var total = $(tabCont).find(".total-cost").html();

    var data = {
      tabId: tabId,
      total: total
    };

    this.adminService.closeTab(data).subscribe(
      (data: any) => {
        if(data.success) {
          alert("Tab has been closed.");
          $(tabCont).remove();
        }
      }
    );

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

  handleBackButtonClick() : void {
    var popUpHeaderText = $("#pop-up-header-text").text();
    if(popUpHeaderText == "Categories") {
      this.exitPopUp();
    } else {
      this.showCategorySlide();
    }
  }

  showCategorySlide() : void {
    $("#category-holder").removeClass("hide");
    $("#item-holder").addClass("hide");
    $(".add-item-cont").addClass("hide");
    $(".add-item-cont").closest(".my-col").addClass("hide");
    $("#pop-up-header-text").html("Categories");
  }

  exitPopUp() : void {
    this.showPopUpHTML = false;
    this.tempItems = [];
    $("#category-holder").removeClass("hide");
    $("#item-holder").addClass("hide");
    $(".add-item-cont").addClass("hide");
    $(".add-item-cont").closest(".my-col").addClass("hide");
    $("#pop-up-header-text").html("Categories");
    $("#added-items").empty();
  }

}
