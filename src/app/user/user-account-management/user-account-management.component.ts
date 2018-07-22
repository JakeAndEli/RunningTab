import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authenticate.service';

@Component({
  selector: 'app-user-account-management',
  templateUrl: './user-account-management.component.html',
  styleUrls: ['./user-account-management.component.css']
})
export class UserAccountManagementComponent implements OnInit {

  private username: String;
  private fullName: String;
  public currentPassword: String;
  public newPassword: String;
  public confirmPassword: String;

  constructor(private userService: UserService,
              private router: Router,
              private authService : AuthenticationService) {
  }

  ngOnInit() {
    this.authService.getUserAccountManagement().subscribe(
      (data: any) => {
        var user = JSON.parse(localStorage.getItem("user"));
        this.username = user.username;
        this.fullName = user.fullName;
      }
    )
  }

  changePassword() {

    if (!this.newPassword || this.newPassword.length <= 7) {
      alert('Password must be 8 characters or more');
      return;
    }
    if (this.newPassword !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (this.newPassword === this.currentPassword) {
      alert('Passwords cannot be the same');
      return;
    }

    if (!this.currentPassword) {
      alert('Enter current password');
      return;
    }


    var user = JSON.parse(localStorage.getItem("user"));
    var newPassword = this.newPassword;
    var currentPassword = this.currentPassword;

    var newPasswordData = {
      userId: user.id,
      newPassword: newPassword,
      currentPassword: currentPassword
    };

    this.userService.checkCurrentPassword(newPasswordData).subscribe(
      (data: any) => {
        if (data.success === false) {
          alert('Current password is incorrect');
          return;
        }
        else {
            console.log(newPasswordData);
          this.userService.changePassword(newPasswordData).subscribe(
            (data: any) => {
              if (data.success === true) {
                alert('password has been changed');
              } else {
                return;
              }
            }
          );

          this.router.navigate(['/user-home']);

        }
      }
    );


  }
}
