import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
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
  player: YT.Player;
  currentProject: Project;
  ytLink = 'tgbNymZ7vqY';
  urlCache = new Map<string, SafeResourceUrl>();
  constructor(private projectsService: ProjectsService, private filesService: FilesService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this._allProject$ = this.projectsService.projects$;
    this._allProject$.subscribe(all => {
      this.currentProject = all[0];
    });
  }

  getVideoUrl(videoId: string) {
    let url = this.urlCache.get(videoId);
    if (!url) {
      url = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.ytLink + '?enablejsapi=1');
      this.urlCache.set(videoId, url);
    }
    return url;
  }

  savePlayer(player) {
    this.player = player;
    console.log('player instance', player);
  }
  deleteFile() {
    this.filesService.deleteImage(this.currentProject);
  }
}
