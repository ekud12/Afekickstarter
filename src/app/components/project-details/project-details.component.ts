import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Project } from '../../models/project.model';
import { FilesService } from '../../services/files.service';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  project: Project;
  _allProject$: Observable<Project[]>;
  player: YT.Player;
  currentProject: Project;
  urlCache = new Map<string, SafeResourceUrl>();
  constructor(
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
    private filesService: FilesService,
    private sanitizer: DomSanitizer
  ) {}

  getVideoUrl(videoId: string) {
    let url = this.urlCache.get(videoId);
    if (!url) {
      url = this.sanitizer.bypassSecurityTrustResourceUrl(
        'https://www.youtube.com/embed/' + this.currentProject.videoLink + '?enablejsapi=1'
      );
      this.urlCache.set(videoId, url);
    }
    return url;
  }

  ngOnInit() {
    this._allProject$ = this.projectsService.projects$;
    this.route.params.subscribe(params => {
      this.projectsService.getProject(params['uid']).subscribe(data => {
        this.currentProject = data;
      });
    });
  }

  deleteImage() {
    this.projectsService.deleteImage(0);
  }
}
