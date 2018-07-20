import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authenticate.service';
import { MenuService } from '../../services/menu.service';
import { AdminService } from '../../services/admin.service';
import * as $ from 'jquery';
import { Router } from '@angular/router';

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

  private tempItems = [];

  constructor(private authService : AuthenticationService,
              private adminService : AdminService,
              private menuService : MenuService,
              private router: Router) {}

  ngOnInit() {
    // Authenticate and then get Tabs
    this.authService.getAdminHome().subscribe(
      (data: any) => {
        if(data.success) {
          var venueId = JSON.parse(localStorage.getItem("user")).venueId;
          this.adminService.getTabs(venueId).subscribe(
            (data: any) => {
              if(data.success) {
                this.tabs = data.tabs;
                //this.organizeTabs();
                this.findTotals();
              }
            }
          )
        }
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
    $("#add-item-pop-up").removeClass("hide");
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
    )

  }

  findTotals() : void {

    var currentTab, currentItem;
    var total;

    for(var i = 0; i < this.tabs.length; i++) {
      currentTab = this.tabs[i];
      total = 0;

      for(var j = 0; j < currentTab.items.length; j++) {
        currentItem = currentTab.items[j];
        total += currentItem.price;
      }

      this.tabs[i].total = total;

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
    $("#add-item-pop-up").addClass("hide");
    $("#category-holder").removeClass("hide");
    $("#item-holder").addClass("hide");
    $(".add-item-cont").addClass("hide");
    $(".add-item-cont").closest(".my-col").addClass("hide");
    $("#pop-up-header-text").html("Categories");
    $("#added-items").empty();
  }

}
