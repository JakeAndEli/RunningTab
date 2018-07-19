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

  constructor(private adminService: AdminService) {
  }

  getVenue() {
    this.adminService.getVenueInfo().subscribe(
      (data: any) => {
        console.log(data);
        this.venueName = data.venue.venueName;
        this.venueTownCity = data.venue.venueTownCity;
        this.venueState = data.venue.venueState;
      }
    );
  }

  ngOnInit() {
    this.getVenue();
  }

}
