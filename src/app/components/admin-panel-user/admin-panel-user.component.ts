import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-admin-panel-user',
  templateUrl: './admin-panel-user.component.html',
  styleUrls: ['./admin-panel-user.component.css']
})
export class AdminPanelUserComponent implements OnInit {
  @Input() user: User;
  type: string;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.type = this.user.roles.admin
      ? 'Administrator'
      : this.user.roles.projectOwner
        ? 'Project Owner'
        : this.user.roles.investor
          ? 'Potential Investor'
          : 'no Type';
  }

  deleteUser() {
    this.userService.deleteUser(this.user);
  }
}
