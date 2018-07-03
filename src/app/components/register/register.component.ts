import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Permissions, PermissionsMap } from '../../models/permissions.model';
import { RegisterRequest, User } from './../../models/user.model';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  _permissions: PermissionsMap[];
  _registerRequest: RegisterRequest = new RegisterRequest();
  _user: User;
  private onDestroy$ = new Subject<void>();

  constructor(public userService: UserService) {
    this._permissions = [
      { value: Permissions.ADMIN, viewValue: 'Admininstrator' },
      { value: Permissions.INVESTOR, viewValue: 'Investor' },
      { value: Permissions.PROJECT_OWNER, viewValue: 'Project Owner' }
    ];
  }

  ngOnInit() {
    this.userService.user$.pipe(takeUntil(this.onDestroy$)).subscribe(user => (this._user = user));
  }

  signup() {
    this.userService.emailSignUp(this._registerRequest);
  }

  check() {
    this.userService.isAdmin(this._user);
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
