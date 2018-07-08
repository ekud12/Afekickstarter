import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Project } from './../../models/project.model';
import { ProjectsService } from './../../services/projects.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit, OnDestroy {
  _projects: Project[];
  projects$: Observable<Project[]>;
  private onDestroy$ = new Subject<void>();
  constructor(private projectService: ProjectsService, private router: Router) {}

  ngOnInit() {
    this.projects$ = this.projectService.getProjects();
    this.projects$.subscribe(
      projects => {
        console.log(projects);
        this._projects = projects;
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
