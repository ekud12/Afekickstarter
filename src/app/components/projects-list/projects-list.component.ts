import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { staggerList } from '../../animations';
import { Project } from './../../models/project.model';
import { ProjectsService } from './../../services/projects.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css'],
  animations: [staggerList]
})
export class ProjectsListComponent implements OnInit, OnDestroy {
  _projects: Project[];
  projects$: Observable<Project[]>;
  totalPreviewsRendered = 0;
  show = false;
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

  checkIfRendered() {
    console.log(this.totalPreviewsRendered);
    this.totalPreviewsRendered++;
    if (this.totalPreviewsRendered === this._projects.length) {
      this.show = true;
    }
  }
  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
