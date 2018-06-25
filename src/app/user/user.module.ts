import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { UserTabsComponent } from './user-tabs/user-tabs.component';
import { UserAccountManagementComponent } from './user-account-management/user-account-management.component';
import { UserHomeComponent } from './user-home/user-home.component';

import { routing } from '../app.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routing)
  ],
  declarations: [UserComponent, UserTabsComponent, UserAccountManagementComponent, UserHomeComponent]
})
export class UserModule { }
