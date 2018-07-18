import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit {

  private menuId;
  private menuCategories;

  constructor(private menuService : MenuService) {}

  ngOnInit() {

    this.menuService.getFullMenu().subscribe(
      (data: any) => {
        this.menuId = data.venue[0].menuId._id;
        this.menuCategories = data.venue[0].menuId.menuCategoryId;
      }
    );

  }

  ngAfterViewInit() {
    this.setClickHandlers(this);
  }

  ngOnDestroy() {
    //$(".category-header").unbind();
  }

  setClickHandlers(thisClass) : void {
    var thisClass = thisClass;
    $(document).ready(function(){
      $(document).on("click", function(event) {
        console.log(event);
      });
      $("#add-category").click(function(){
        thisClass.showCategoryForm();
      });
      $(".cancel-category").click(function(){
        thisClass.hideCategoryForm(this);
      });
      $(".save-category").click(function(){
        thisClass.addCategory(this);
      });
      $(".add-item").click(function(){
        thisClass.showItemForm(this);
      });
      $(".cancel-item").click(function(){
        thisClass.hideItemForm(this);
      });
      $(".save-item").click(function(){
        thisClass.addItem(this);
      });
      $(".remove-item").click(function(){
        thisClass.removeItem(this);
      });
      $(".category-header").click(function(){
        thisClass.expandItems(this);
      });
      $(".remove-all").click(function(){
        thisClass.removeAll(this);
      });
      $(".remove-category").click(function(){
        thisClass.removeCategory(this);
      });
    });
  }

  showCategoryForm() : void {
    var newAddCategoryDialogue = $(".add-category-dialogue").first().clone(true).insertBefore("#add-category");
    $(newAddCategoryDialogue).removeClass("hide");
  }

  hideCategoryForm(clickedElement) : void {
    var dialogueElem = $(clickedElement).parent().parent();
    $(dialogueElem).css('max-height',$(dialogueElem).height()).slideUp(function(){
      $(dialogueElem).remove();
    });
  }

  addCategory(clickedElement) : void {
    var dialogueElem = $(clickedElement).parent().parent();
    var newCategoryName = $(dialogueElem).find(".add-category-name").val();
    var userObj = JSON.parse(localStorage.getItem('user'));

    var categoryObj = {
      name: newCategoryName,
      venueId: userObj.venueId
    };

    this.menuService.addCategory(categoryObj).subscribe(
      (data: any) => {
        if(data.success) {
          var newAddCategoryCont = $(".category-cont.hide").first().clone(true).insertAfter($(".category-cont").last());
          $(newAddCategoryCont).attr("data-menucategoryid", data.menuCategoryId);
          $(newAddCategoryCont).find(".category-name").text(newCategoryName);
          $(newAddCategoryCont).removeClass("hide");
          $(newAddCategoryCont).addClass("clone");
          $(dialogueElem).remove();
        }
      }
    );

  }

  showItemForm(clickedElement) : void {
    var newAddItemDialogue = $(".add-item-dialogue").first().clone(true).insertBefore($(clickedElement));
    $(newAddItemDialogue).removeClass("hide");
  }

  hideItemForm(clickedElement) : void {
    var dialogueElem = $(clickedElement).parent().parent();
    $(dialogueElem).css('max-height',$(dialogueElem).height()).slideUp(function(){
      $(dialogueElem).remove();
    });
  }

  addItem(clickedElement) : void {
    var categoryItems = $(clickedElement).parent().parent().parent();
    var dialogueElem = $(clickedElement).parent().parent();
    var newItemName = $(dialogueElem).find(".add-item-name").val();
    var newItemPrice = $(dialogueElem).find(".add-item-price").val();
    var menuCategory = $(categoryItems).parent();
    var menuCategoryId = $(menuCategory).data("menucategoryid");

    var itemObj = {
      name: newItemName,
      price: newItemPrice,
      menuCategoryId: menuCategoryId
    };

    this.menuService.addItem(itemObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.success) {
          var newAddItemCont = $(".item-cont.hide").first().clone(true).insertAfter($(categoryItems).find(".item-cont").last());
          $(newAddItemCont).attr("data-itemid", data.itemId);
          $(newAddItemCont).find(".item-name").text(newItemName);
          $(newAddItemCont).find(".item-price").text(newItemPrice);
          $(newAddItemCont).removeClass("hide");
          $(newAddItemCont).addClass("clone");
          $(dialogueElem).remove();
        }
      }
    );
  }

  removeItem(clickedElement) : void {
    var itemId = $(clickedElement).closest(".item-cont").attr("data-itemid");
    var menuCategoryId = $(clickedElement).closest(".category-cont").attr("data-menucategoryid");
    var data = {
      itemId: itemId,
      menuCategoryId: menuCategoryId
    };

    this.menuService.removeItem(data).subscribe(
      (data: any) => {
        $(clickedElement).closest(".item-cont").remove();
      }
    );
  }

  expandItems(clickedElement) : void {
    var categoryCont = $(clickedElement).parent();
    var categoryItems = $(categoryCont).find(".category-items");

    $(categoryItems).slideToggle("400");
    $(categoryCont).find(".arrow-icon").toggleClass('flip');
  }

  removeAll(clickedElement) : void {
    var menuContent = $(clickedElement).parent().parent();
    var categoryCont = $(menuContent).find(".category-cont");

    $(categoryCont).remove(".clone");
  }

  removeCategory(clickedElement) : void {
    var menuCategoryCont = $(clickedElement).closest(".category-cont");
    var menuCategoryId = $(menuCategoryCont).attr("data-menucategoryid");
    var data = {
      menuId: this.menuId,
      menuCategoryId: menuCategoryId
    };

    this.menuService.removeCategory(data).subscribe(
      (data: any) => {
        $(menuCategoryCont).remove();
      }
    );
  }

}
