import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { fadeAnimation } from './../../animations/animations';
import { ProjectsService } from './../../services/projects.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css'],
  animations: [fadeAnimation]
})
export class ContainerComponent implements OnInit, OnDestroy {
  _user: Observable<User>;
  userProjectsCount = 0;
  isLoading = true;
  private onDestroy$ = new Subject<void>();
  constructor(public userService: UserService, private router: Router, private projectService: ProjectsService) {}

  ngOnInit() {
    this._user = this.userService.user$;
    this._user
      .pipe(
        tap(() => {
          this.isLoading = false;
        }),
        filter(user => user !== null && user !== undefined),
        takeUntil(this.onDestroy$)
      )
      .subscribe(user => {
        this.projectService
          .getProjects()
          .pipe(
            filter(projects => projects !== null && projects !== undefined),
            takeUntil(this.onDestroy$)
          )
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

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
