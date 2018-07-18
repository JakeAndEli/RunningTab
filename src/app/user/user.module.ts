import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { UserTabsComponent } from './user-tabs/user-tabs.component';
import { UserAccountManagementComponent } from './user-account-management/user-account-management.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserService } from '../services/user.service';

import { routing } from '../app.routes';
import {AdminService} from '../services/admin.service';
import {MenuService} from '../services/menu.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routing)
  ],
  declarations: [UserComponent, UserTabsComponent, UserAccountManagementComponent, UserHomeComponent],
  providers: [UserService]
})
export class UserModule { }
