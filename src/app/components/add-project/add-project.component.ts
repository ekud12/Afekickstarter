import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FileUpload } from '../../models/file.model';
import { Project } from '../../models/project.model';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { FilesService } from './../../services/files.service';
import { ProjectsService } from './../../services/projects.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddProjectComponent implements OnInit {
  @ViewChild('addProjForm') myForm;
  user: User;
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  uploadProgress: Observable<number>;
  downloadURL: string;
  files = new Array<File>(4);
  counter$: Observable<number>;
  submitLocked = true;
  request = new Project();
  status = 'waiting';
  minDate = new Date(Date.now());
  time: string;
  date: Date;

  constructor(
    private filesService: FilesService,
    private router: Router,
    private userService: UserService,
    private projectService: ProjectsService
  ) {}

  ngOnInit() {
    this.counter$ = this.filesService.counter$;
    this.userService.user$.subscribe(val => {
      this.user = val;
      this.request.owner = this.user.uid;
    });
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
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

  addProject() {
    this.updateTime();
    this.status = 'creating';
    this.request.startDate = Date.now();
    this.request.endDate = this.date.valueOf();
    this.request.uid = Math.random()
      .toString(36)
      .substring(2);
    this.filesService.uploadFile(this.request.uid, this.files).then(pics => {
      this.request.thumbnail = pics[3];
      this.request.pics = pics;
      this.projectService
        .createProject(this.request)
        .then(res => {
          this.status = 'done';
          setTimeout(() => {
            this.router.navigate(['/home/projects']);
          }, 1500);
        })
        .catch(error => {
          console.log(error);
        });
    });
  }

  deleteFile() {}
}
