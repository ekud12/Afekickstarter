import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PermissionsMap } from '../../models/permissions.model';
import { LoginRequest, User } from './../../models/user.model';
import { UserService } from './../../services/user.service';
import { fadeAnimation } from '../../animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [fadeAnimation]
})
export class LoginComponent implements OnInit {
  _permissions: PermissionsMap[];
  _loginRequest: LoginRequest = new LoginRequest();
  _user: Observable<User>;
  constructor(public userService: UserService, private router: Router) {}

  ngOnInit() {
    this._user = this.userService.user$;
    this._user.subscribe(user => {
      if (user) {
        this.router.navigate(['/home']);
      }
    });
  }

  login() {
    this.userService.signIn(this._loginRequest);
  }
}
