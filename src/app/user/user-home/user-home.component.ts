import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authenticate.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
  providers: [AuthenticationService]
})
export class UserHomeComponent implements OnInit {

  constructor(private authService : AuthenticationService) { }

  ngOnInit() {
    // Authenticate
    this.authService.getUserHome().subscribe(
      (data: any) => {
        console.log("returned to user home comp: " + data);
      }
    )
  }

}
