import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FileUpload } from '../../models/file.model';
import { Project } from '../../models/project.model';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { FilesService } from './../../services/files.service';
import { ProjectsService } from './../../services/projects.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  user: User;
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  uploadProgress: Observable<number>;
  downloadURL: string;
  files = new Array<File>(3);
  count: number;
  submitLocked = true;
  request = new Project();
  constructor(
    private uploadService: FilesService,
    private router: Router,
    private userService: UserService,
    private projectService: ProjectsService
  ) {}

  ngOnInit() {
    this.count = 0;
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

  addProject() {
    this.request.totInvestors = 0;
    this.request.totMoneyNeeded = 10000;
    this.request.totInvestors = 0;
    this.request.startDate = new Date().getMilliseconds();
    this.request.endDate = new Date().getMilliseconds();
    this.request.uid = Math.random()
      .toString(36)
      .substring(2);
    this.request.thumbnail = '';
    this.uploadService.uploadFile(this.request.uid, this.files).then(pics => {
      this.request.pics = pics;
      this.projectService
        .createProject(this.request)
        .then(res => {
          this.router.navigate(['/home/projects']);
        })
        .catch(error => {
          console.log(error);
        });
    });
  }

  deleteFile() {}
}
