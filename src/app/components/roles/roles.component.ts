import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { RoleModel } from '../../models/role.model';
import { AuthService } from '../../services/auth.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'mtd-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RolesComponent implements OnInit {

  isAuthenticated$: Observable<boolean>;
  roles: RoleModel[];

  constructor(private roleService: RoleService, private auth: AuthService) {

  }

  ngOnInit() {
    this.isAuthenticated$ = this.auth.getIsAuthenticatedStream();
  }

}
