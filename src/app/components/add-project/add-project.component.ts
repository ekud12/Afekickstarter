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
    console.log(this.files[0]);
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  updateFile(event, picnum) {
    this.files[picnum] = event.target.files[0];
  }

  addProject() {
    this.status = 'creating';
    this.request.startDate = Date.now();
    this.request.endDate = this.request.endDate.valueOf();
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
          }, 3000);
        })
        .catch(error => {
          console.log(error);
        });
    });
  }

  deleteFile() {}
}
