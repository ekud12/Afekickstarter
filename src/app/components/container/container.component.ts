import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { ProjectsService } from './../../services/projects.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  _user: Observable<User>;
  userProjectsCount = 0;
  private onDestroy$ = new Subject<void>();
  constructor(private userService: UserService, private router: Router, private projectService: ProjectsService) {}

  ngOnInit() {
    this._user = this.userService.user$;
    this._user.subscribe(user => {
      this.projectService
        .getProjects()
        .pipe(filter(projects => projects !== null && projects !== undefined))
        .subscribe(values => {
          this.userProjectsCount = values.filter(item => item.owner === user.uid).length;
        });
    });
  }

  logout() {
    this.userService.signOut();
  }

  goToAddProject() {
    this.router.navigate(['add']);
  }
}
