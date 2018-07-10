import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
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
  _projectsToshow: Project[];
  projects$: Observable<Project[]>;
  projectsAmountFundedQuery = 0;
  projectsCompletedQuery = 0;
  projectsLive = 0;

  private onDestroy$ = new Subject<void>();

  constructor(private projectService: ProjectsService, private router: Router) {}

  ngOnInit() {
    this.projects$ = this.projectService.getProjects();
    this.projects$
      .pipe(
        tap(() => {
          this.projectsAmountFundedQuery = 0;
          this.projectsCompletedQuery = 0;
          this.projectsLive = 0;
        })
      )
      .subscribe(
        projects => {
          this._projects = projects;
          this._projects.map(project => {
            this.projectsAmountFundedQuery += project.totMoneyRaised;
            this.projectsCompletedQuery += project.completed ? 1 : 0;
          });
          this._projectsToshow = projects.filter(
            project => !project.completed && !project.expired && project.endDate < Date.now()
          );
          this.projectsLive = this._projectsToshow.length ? this._projectsToshow.length : 0;
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
