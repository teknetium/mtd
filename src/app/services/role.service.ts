import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ENV } from './env.config';
import { AuthService } from './auth.service';
import { RoleModel } from '../models/role.model';


@Injectable({
  providedIn: 'root'
})
export class RoleService {


  _allRoles = [
    {
      name: 'Basic',
      iconClass: 'fas fa-lg fa-fw fa-user',
      tooltip: 'Viewing of your trainings only.',
      resources: [
        {name: 'Home', route: 'home'},
        {name: 'My Trainings', route: 'mytrainings'}
      ]
    },
    {
      name: 'Supervisor',
      iconClass: 'fas fa-lg fa-fw fa-user-tie',
      tooltip: 'Access to your teams user and training data.',
      resources: [
        {name: 'Home', route: 'home'},
        {name: 'My Trainings', route: 'mytrainings'},
        {name: 'All Trainings', route: 'alltrainings'},
        {name: 'All Users', route: 'allusers'},
      ]
    },
    {
      name: 'Admin',
      iconClass: 'fas fa-lg fa-fw fa-user-crown',
      tooltip: 'Access to all data for the domain.',
      resources: [
        {name: 'Home', route: 'home'},
        {name: 'My Trainings', route: 'mytrainings'},
        {name: 'All Trainings', route: 'alltrainings'},
        {name: 'All Users', route: 'allusers'},
        {name: 'Role Admin', route: 'roleadmin'},
        {name: 'Notification Admin', route: 'notificationadmin'},
        {name: 'Settings', route: 'settings'},
      ]
    }
  ];


  constructor() {
  }

  getUserRoles() {
    return this._allRoles;
  }
}
