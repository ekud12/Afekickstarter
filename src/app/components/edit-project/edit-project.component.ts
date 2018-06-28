import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../../models/project.model';
import { FilesService } from './../../services/files.service';
import { ProjectsService } from './../../services/projects.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {
  _allProject$: Observable<Project[]>;
  currentProject: Project;
  constructor(private projectsService: ProjectsService, private filesService: FilesService) {}

  ngOnInit() {
    this._allProject$ = this.projectsService.projects$;
    this._allProject$.subscribe(all => {
      this.currentProject = all.find(item => item.uid === 'firstProject');
    });
  }

  deleteFile() {
    this.filesService.deleteImage(this.currentProject);
  }
}
