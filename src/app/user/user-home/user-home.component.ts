import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authenticate.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
  providers: [AuthenticationService]
})
export class UserHomeComponent implements OnInit {

  private username : String;
  private fullName : String;
  private qrCode : String;

  constructor(private authService : AuthenticationService) { }

  ngOnInit() {
    // Authenticate
    this.authService.getUserHome().subscribe(
      (data: any) => {
        var user = JSON.parse(localStorage.getItem("user"));
        this.username = user.username;
        this.fullName = user.username;
        this.qrCode = user.qrCode;
      }
    )
  }

}
