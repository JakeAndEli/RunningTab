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

  constructor(private authService : AuthenticationService,
              private adminService : AdminService,
              private menuService : MenuService) {}

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
      }
    }
  }

  addItem(item) {
    var newItemToTab = "<div class='itemOnTab' data-itemid='" + item._id + "'>" + item.name + "</div>";
    $("#added-items").append($(newItemToTab));
  }

  saveItemsToTab() : void {
    var items = [];
    var itemsInDom = $(".itemOnTab");
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
    $("#pop-up-header-text").html("Categories");
  }

  exitPopUp() : void {
    $("#add-item-pop-up").addClass("hide");
    $("#category-holder").removeClass("hide");
    $("#item-holder").addClass("hide");
    $(".add-item-cont").addClass("hide");
    $("#pop-up-header-text").html("Categories");
    $("#added-items").empty();
  }

}
