import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-admin-past-bills',
  templateUrl: './admin-past-bills.component.html',
  styleUrls: ['./admin-past-bills.component.css']
})
export class AdminPastBillsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function(){
      $(".arrow").click(function(){
        var clickedTabElement = $(this).parent().parent();
        $(clickedTabElement).find(".items").slideToggle("400");
        $(clickedTabElement).find(".sub-total-cont").slideToggle("400");
        $(clickedTabElement).find(".tip-cont").slideToggle("400");
        $(clickedTabElement).find(".total-cont").slideToggle("400");
        $(clickedTabElement).find(".arrow-icon").toggleClass('flip');
      });
    });

  }

}
