import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from './../../services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {
  _user: Observable<User>;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this._user = this.userService.user$;
  }

  logout() {
    this.userService.signOut();
  }
}
