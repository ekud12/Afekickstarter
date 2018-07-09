import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { staggerList } from '../../animations';
import { Project } from './../../models/project.model';
import { ProjectsService } from './../../services/projects.service';
import { tap } from 'rxjs/operators';

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
  projectsAmountFundedQuery = 0;
  projectsCompletedQuery = 0;
  show = false;
  private onDestroy$ = new Subject<void>();
  constructor(private projectService: ProjectsService, private router: Router) {}

  ngOnInit() {
    this.projects$ = this.projectService.getProjects();
    this.projects$
      .pipe(
        tap(() => {
          this.projectsAmountFundedQuery = 0;
          this.projectsCompletedQuery = 0;
        })
      )
      .subscribe(
        projects => {
          this._projects = projects;
          this._projects.map(project => {
            this.projectsAmountFundedQuery += project.totMoneyRaised;
            this.projectsCompletedQuery += project.completed ? 1 : 0;
          });
        },
        error => {
          console.log(error);
        }
      );
  }

  checkIfRendered() {
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
