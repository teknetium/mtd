import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { RolesComponent } from './roles.component';
import { CreateRoleComponent } from './create-role/create-role.component';

@NgModule({
  declarations: [
    RolesComponent,
    CreateRoleComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RolesComponent
  ]
})
export class RolesModule { }
