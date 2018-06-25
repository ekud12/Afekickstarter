import { Component, OnInit } from '@angular/core';
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

  constructor(private uploadService: FilesService) {}

  ngOnInit() {}

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new FileUpload(file);
    this.currentFileUpload.projectID = 'firstProject';
    this.currentFileUpload.imgNum = 1;
    this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress);
  }
}
