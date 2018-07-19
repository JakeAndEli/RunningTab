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
                this.organizeTabs();
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

  calculateTotal() : void {

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
    var newItemToTab = $("<div class='item-on-tab' data-itemid='" + item._id + "'></div>");
    var newItemName = $("<div class='item-name'>" + item.name + "</div>");
    var deleteTempItem = $("<div class='delete-temp-item'></div>");
    var deleteTempItemImg = $("<img src='assets/images/minus.png' />");

    newItemName.css("display", "inline-block");
    deleteTempItem.css("display", "inline-block");
    deleteTempItem.css("float", "right");
    deleteTempItem.css("height", "25px");
    deleteTempItem.css("width", "25px");
    deleteTempItem.css("cursor", "pointer");
    deleteTempItem.css("margin-right", "10px");
    deleteTempItemImg.css("height", "100%");
    deleteTempItemImg.css("width", "100%");
    deleteTempItem.append(deleteTempItemImg);
    newItemToTab.append(newItemName);
    newItemToTab.append(deleteTempItem);

    $(".delete-temp-item").click(function() {
      console.log("Clicked it");
      $(this).closest(".item-on-tab").remove();
    });

    $("#added-items").append(newItemToTab);
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
    console.log(data);
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

  closeTab() : void {

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
