import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService} from './auth.service';
import { RoleService} from './role.service';
import { UserService} from './user.service';
import { ApiService} from './api.service';
import { TrainingService} from './training.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AuthService,
    RoleService,
    UserService,
    ApiService,
    TrainingService
  ]
})
export class ServicesModule { }
