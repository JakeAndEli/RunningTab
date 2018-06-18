import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { UserTabsComponent } from './user-tabs/user-tabs.component';
import { UserAccountManagementComponent } from './user-account-management/user-account-management.component';
import { UserHomeComponent } from './user-home/user-home.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UserComponent, UserTabsComponent, UserAccountManagementComponent, UserHomeComponent]
})
export class UserModule { }
