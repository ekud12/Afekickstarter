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
  adminAvatar = '../../../assets/admin.png';
  investorAvatar = '../../../assets/investor.png';
  ownerAvatar = '../../../assets/owner.png';
  url: string;
  readonly = true;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.type = this.user.roles.admin
      ? 'Administrator'
      : this.user.roles.projectOwner
        ? 'Project Owner'
        : this.user.roles.investor
          ? 'Potential Investor'
          : 'no Type';
    switch (this.type) {
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


  editName() {
    this.readonly = false;
  }

  saveNewName() {
    this.readonly = true;
    this.userService.updateUserName(this.user);
  }
}
