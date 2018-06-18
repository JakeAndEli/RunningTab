import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { AdminOpenBillsComponent } from './admin-open-bills/admin-open-bills.component';
import { AdminPastBillsComponent } from './admin-past-bills/admin-past-bills.component';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { AdminUserManagementComponent } from './admin-user-management/admin-user-management.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AdminComponent, AdminOpenBillsComponent, AdminPastBillsComponent, AdminMenuComponent, AdminUserManagementComponent, AdminProfileComponent]
})
export class AdminModule { }
