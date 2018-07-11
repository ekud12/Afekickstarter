import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FileUpload } from '../../models/file.model';
import { Pic, Project } from '../../models/project.model';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { FilesService } from './../../services/files.service';
import { ProjectsService } from './../../services/projects.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit, OnDestroy {
  @ViewChild('editForm') myForm;
  private onDestroy$ = new Subject<any>();

  user: User;
  currentFileUpload: FileUpload;
  currentProject: Project;
  files = new Array<File>(4);

  status = 'waiting';
  minDate = new Date(Date.now());
  time: string;
  date: Date;

  constructor(
    private filesService: FilesService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private projectService: ProjectsService
  ) {}

  ngOnInit() {
    this.userService.user$.pipe(takeUntil(this.onDestroy$)).subscribe(val => {
      this.user = val;
    });
    this.route.params.subscribe(params => {
      this.projectService.getProject(params['uid']).subscribe(data => {
        this.currentProject = data;
      });
    });
  }

  updateFile(event, picnum) {
    this.files[picnum] = event.target.files[0];
  }

  updateTime() {
    const strings = this.time.split(' ');
    let hours, min;
    let time2 = strings[0];
    const type = strings[1];
    if (time2.length === 4) {
      time2 = `0${time2}`;
    }
    const specifics = time2.split(':');
    hours = specifics[0];
    min = specifics[1];
    if (type === 'PM') {
      hours = (+hours + 12).toString();
    }
    this.date.setHours(+hours, +min);
  }

  saveChanges() {
    this.status = 'creating';
    this.filesService.uploadFile(this.currentProject.uid, this.files).then((pics: Array<Pic>) => {
      pics.map((pic, index) => {
        if (this.currentProject.pics[index].key !== pic.key && pic.key !== '') {
          this.currentProject.pics[index] = pic;
        }
      });
      if (pics[3].key !== '' && pics[3].key !== this.currentProject.thumbnail.key) {
        this.currentProject.thumbnail = pics[3];
      }
      setTimeout(() => {
        this.projectService
          .editProject(this.currentProject)
          .then(() => {
            this.status = 'done';
            setTimeout(() => {
              this.router.navigate(['/home/projects']);
            }, 1000);
          })
          .catch(error => {
            console.log(error);
          });
      }, 1500);
    });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
