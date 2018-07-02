import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FileUpload } from '../../models/file.model';
import { Pic, Project } from '../../models/project.model';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { FilesService } from './../../services/files.service';
import { ProjectsService } from './../../services/projects.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  user: User;
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  progress: { percentage: number } = { percentage: 0 };
  firstImageUploaded = false;
  secondImageUploaded = false;
  thirdImageUploaded = false;
  uploadProgress: Observable<number>;
  downloadURL: string;
  files = new Array<File>(3);
  count: number;
  submitLocked = true;
  request = new Project();
  constructor(
    private uploadService: FilesService,
    private afstorage: AngularFireStorage,
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
    this.request.startDate = new Date();
    this.request.endDate = new Date();
    this.request.uid = Math.random()
      .toString(36)
      .substring(2);
    this.request.pics = new Array<Pic>(3);
    this.request.thumbnail = '';
    this.projectService.createProject(this.request).then(p_id => {
      this.uploadFile(p_id);
    });
  }

  deleteFile() {}

  uploadFile(key: string) {
    this.files.map((item, index) => {
      this.currentFileUpload = new FileUpload(item);
      const id = Math.random()
        .toString(36)
        .substring(2);
      const fileRef = this.afstorage.ref(id);
      this.currentFileUpload.key = id;
      this.currentFileUpload.projectID = key;
      const task = this.afstorage.ref(id).put(item);
      this.uploadProgress = task.percentageChanges();
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
              this.currentFileUpload.url = url;
              this.uploadService.saveFileData(this.currentFileUpload, index);
              this.count++;
              if (this.count === 3) {
                this.submitLocked = false;
              }
            });
          })
        )
        .subscribe();
    });
  }
}
