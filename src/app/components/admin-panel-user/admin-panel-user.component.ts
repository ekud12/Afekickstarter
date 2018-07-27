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
  currentUserRole: string;
  adminAvatar = '../../../assets/admin.png';
  investorAvatar = '../../../assets/investor.png';
  ownerAvatar = '../../../assets/owner.png';
  url: string;
  readonly = true;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.currentUserRole = this.user.roles.admin
      ? 'Administrator'
      : this.user.roles.projectOwner
        ? 'Project Owner'
        : this.user.roles.investor
          ? 'Potential Investor'
          : 'no Type';
    switch (this.currentUserRole) {
      case 'Administrator':
        this.url = this.adminAvatar;
        break;
      case 'Project Owner':
        this.url = this.ownerAvatar;
        break;
      case 'Potential Investor':
        this.url = this.investorAvatar;
        break;
    }
  }

  enableEdit() {
    this.readonly = false;
  }

  save() {
    this.readonly = true;
    this.userService.updateUserName(this.user);
  }
}
