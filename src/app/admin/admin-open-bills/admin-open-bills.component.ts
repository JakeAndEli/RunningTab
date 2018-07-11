import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authenticate.service';

@Component({
  selector: 'app-admin-open-bills',
  templateUrl: './admin-open-bills.component.html',
  styleUrls: ['./admin-open-bills.component.css'],
  providers: [AuthenticationService]
})
export class AdminOpenBillsComponent implements OnInit {

  constructor(private authService : AuthenticationService) {}

  ngOnInit() {
    // Authenticate
    this.authService.getAdminHome().subscribe(
      (data: any) => {
        console.log("returned to admin home comp: " + data);
      }
    )
  }

}
