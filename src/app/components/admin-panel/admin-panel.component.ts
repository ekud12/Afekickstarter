import { ProjectsService } from './../../services/projects.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { UserService } from './../../services/user.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  users$: Observable<User[]>;
  projects$: Observable<Project[]>;
  constructor(private userService: UserService, private projectService: ProjectsService) {}

  ngOnInit() {
    this.users$ = this.userService.getAllUsers();
    this.projects$ = this.projectService.getProjects();
  }

}
