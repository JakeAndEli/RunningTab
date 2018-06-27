import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function(){
      $("#add-item").click(function(){
        var newAddItemDialogue = $(".add-item-dialogue").first().clone(true).insertBefore("#add-item");
        $(newAddItemDialogue).removeClass("hide");
      });
      $(".cancel-item").click(function(){
        var dialogueItem = $(this).parent().parent();
        $(dialogueItem).css('max-height',$(dialogueItem).height()).slideUp(function(){
          $(dialogueItem).remove();
        });
      });
      $(".save-item").click(function(){
        var dialogueItem = $(this).parent().parent();
        var newItemName = $(dialogueItem).find(".add-item-name").val();
        var newItemPrice = $(dialogueItem).find(".add-item-price").val();

        var newAddItemCont = $(".item-cont").first().clone(true).insertAfter($(".item-cont").last());
        $(newAddItemCont).find(".item-name").text(newItemName);
        $(newAddItemCont).find(".item-price").text(newItemPrice);
        $(newAddItemCont).removeClass("hide");

        $(dialogueItem).remove();
      });
    });
  }

}
