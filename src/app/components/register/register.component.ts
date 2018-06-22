import { Component, OnInit } from '@angular/core';
import { Permissions, PermissionsMap } from '../../models/permissions.model';
import { RegisterRequest, User } from './../../models/user.model';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  _permissions: PermissionsMap[];
  _registerRequest: RegisterRequest = new RegisterRequest();
  _user: User;
  constructor(public userService: UserService) {
    this._permissions = [
      { value: Permissions.ADMIN, viewValue: 'Admininstrator' },
      { value: Permissions.INVESTOR, viewValue: 'Investor' },
      { value: Permissions.PROJECT_OWNER, viewValue: 'Project Owner' }
    ];
  }

  ngOnInit() {
    this.userService.user$.subscribe(user => (this._user = user));
  }

  signup() {
    this.userService.emailSignUp(this._registerRequest);
  }

  check() {
    this.userService.canDelete(this._user);
  }
}
