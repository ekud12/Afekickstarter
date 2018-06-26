import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FileUpload } from '../../models/file.model';
import { FilesService } from './../../services/files.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
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

  constructor(private uploadService: FilesService, private afstorage: AngularFireStorage) {
    this.uploadProgress = this.uploadService.uploadProgress;
  }

  ngOnInit() {
    this.count = 0;
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  updateFile(event, picnum) {
    this.files[picnum] = event.target.files[0];
  }

  uploadFile() {
    this.files.map((item, index) => {
      this.currentFileUpload = new FileUpload(item);
      const id = Math.random()
        .toString(36)
        .substring(2);
      const fileRef = this.afstorage.ref(id);
      const task = this.afstorage.ref(id).put(item);
      this.uploadProgress = task.percentageChanges();
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
              this.currentFileUpload.projectID = 'firstProject';
              this.currentFileUpload.url = url;
              this.uploadService.saveFileData(this.currentFileUpload, index);
              this.count++;
            });
          })
        )
        .subscribe();
    });
  }
}
