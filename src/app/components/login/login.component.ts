import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PermissionsMap } from '../../models/permissions.model';
import { LoginRequest, User } from './../../models/user.model';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  _permissions: PermissionsMap[];
  _loginRequest: LoginRequest = new LoginRequest();
  _user: Observable<User>;
  constructor(private auth: UserService) {}

  ngOnInit() {
    this._user = this.auth.user$;
  }

  login() {
    this.auth.signIn(this._loginRequest);
  }
}
