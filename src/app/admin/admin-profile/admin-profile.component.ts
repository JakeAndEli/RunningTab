import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AdminService} from '../../services/admin.service';
import {AuthenticationService} from '../../services/authenticate.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

  private venueName: String;
  private venueTownCity: String;
  private venueState: String;

  constructor(private adminService: AdminService,
              private authService : AuthenticationService) {
  }

  ngOnInit() {
    this.authService.getAdminProfile().subscribe(
      (data: any) => {
        this.adminService.getVenueInfo().subscribe(
          (data: any) => {
            console.log(data);
            this.venueName = data.venue.venueName;
            this.venueTownCity = data.venue.venueTownCity;
            this.venueState = data.venue.venueState;
          }
        );
      }
    )
  }

}
