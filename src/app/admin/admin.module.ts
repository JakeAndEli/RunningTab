import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdminOpenBillsComponent } from './admin-open-bills/admin-open-bills.component';
import { AdminPastBillsComponent } from './admin-past-bills/admin-past-bills.component';
import { AdminScanQRComponent } from './admin-scan-qr/admin-scan-qr.component';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { AdminUserManagementComponent } from './admin-user-management/admin-user-management.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { MenuService } from '../services/menu.service';

import { routing } from '../app.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routing)
  ],
  declarations: [AdminComponent, AdminOpenBillsComponent, AdminPastBillsComponent, AdminScanQRComponent, AdminMenuComponent, AdminUserManagementComponent, AdminProfileComponent, AdminScanQRComponent],
  providers: [MenuService]
})
export class AdminModule { }
