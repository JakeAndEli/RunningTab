import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { SignUpComponent } from './login/sign-up/sign-up.component';
import { SignUpPickRoleComponent } from './login/sign-up-pick-role/sign-up-pick-role.component';
import { SignUpVenueInfoComponent } from './login/sign-up-venue-info/sign-up-venue-info.component';
import { AdminOpenBillsComponent } from './admin/admin-open-bills/admin-open-bills.component';
import { AdminPastBillsComponent } from './admin/admin-past-bills/admin-past-bills.component';
import { AdminScanQRComponent } from './admin/admin-scan-qr/admin-scan-qr.component';
import { AdminMenuComponent } from './admin/admin-menu/admin-menu.component';
import { AdminUserManagementComponent } from './admin/admin-user-management/admin-user-management.component';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { UserHomeComponent } from './user/user-home/user-home.component';
import { UserTabsComponent } from './user/user-tabs/user-tabs.component';
import { UserAccountManagementComponent } from './user/user-account-management/user-account-management.component';

export const routing:Routes = [
  {path: '', redirectTo: 'signin', pathMatch: 'full'},
  {path: 'signin', component: SignInComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'signup-pick-role', component: SignUpPickRoleComponent},
  {path: 'signup-venue-info', component: SignUpVenueInfoComponent},
  {path: 'admin-open-bills', component: AdminOpenBillsComponent},
  {path: 'admin', redirectTo: 'admin-open-bills', pathMatch: 'full'},
  {path: 'admin-open-bills', component: AdminOpenBillsComponent},
  {path: 'admin-past-bills', component: AdminPastBillsComponent},
  {path: 'admin-scan-qr', component: AdminScanQRComponent},
  {path: 'admin-menu', component: AdminMenuComponent},
  {path: 'admin-user-management', component: AdminUserManagementComponent},
  {path: 'admin-profile', component: AdminProfileComponent},
  {path: 'user', redirectTo: 'user-home', pathMatch: 'full'},
  {path: 'user-home', component: UserHomeComponent},
  {path: 'user-tabs', component: UserTabsComponent},
  {path: 'user-account-management', component: UserAccountManagementComponent}
];
