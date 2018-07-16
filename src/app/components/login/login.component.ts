import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { fadeAnimation } from '../../animations';
import { PermissionsMap } from '../../models/permissions.model';
import { LoginRequest, User } from './../../models/user.model';
import { ToastService } from './../../services/toast.service';
import { UserService } from './../../services/user.service';

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
  isLoading = false;
  constructor(public userService: UserService, private router: Router, private toaster: ToastService) {}

  ngOnInit() {
    this._user = this.userService.user$;
    this._user.subscribe(user => {
      if (user) {
        this.router.navigate(['/home']);
      }
    });
  }

  login() {
    this.isLoading = true;
    this.userService
      .signIn(this._loginRequest)
      .then(value => {
        this.isLoading = false;
        this.router.navigate(['home']);
      })
      .catch(error => {
        this.toaster.openSnackBar(error.message);
        this.isLoading = false;
      });
  }
}
