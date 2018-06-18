import { Component, OnInit } from '@angular/core';
import { Permissions } from '../../models/permissions.model';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  _permissions = [Permissions.ADMIN, Permissions.BACKER, Permissions.PROJECT_OWNER];
  constructor(private userService: UserService) {}

  ngOnInit() {}

  signup() {
    // this.userService.signup();
  }
}
