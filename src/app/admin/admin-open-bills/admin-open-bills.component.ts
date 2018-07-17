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
          console.log(this.categories);
        }
      }
    );
  }

  addItem() : void {
    $("#add-item-pop-up").removeClass("hide");
    console.log("Clicked add item");

  }

  closeTab() : void {

  }

}
