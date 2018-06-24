import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { Project } from './../../models/project.model';
import { ProjectsService } from './../../services/projects.service';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {
  _user: Observable<User>;
  _projects: Project[];
  constructor(private userService: UserService, private projectService: ProjectsService, private router: Router) {}

  ngOnInit() {
    this._user = this.userService.user$;
    this.projectService.projects$.subscribe(projects => (this._projects = projects));
  }

  logout() {
    this.userService.signOut();
  }
  addp() {
    this.projectService.createProject();
  }
  goToAddProject() {
    this.router.navigate(['add']);
  }
}
