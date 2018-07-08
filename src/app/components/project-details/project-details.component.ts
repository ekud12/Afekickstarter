import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Project } from '../../models/project.model';
import { User } from '../../models/user.model';
import { FilesService } from '../../services/files.service';
import { ProjectsService } from '../../services/projects.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  project: Project;
  user: Observable<User>;
  _allProject$: Observable<Project[]>;
  player: YT.Player;
  currentProject: Project;
  urlCache = new Map<string, SafeResourceUrl>();

  // Carousel Options
  urls = [];
  height = '400px';
  minHeight;
  arrowSize = '40px';
  showArrows = true;
  disableSwiping = false;
  autoPlay = true;
  autoPlayInterval = 3333;
  stopAutoPlayOnSlide = true;
  debug = false;
  backgroundSize = 'cover';
  backgroundPosition = 'center center';
  backgroundRepeat = 'no-repeat';
  showDots = true;
  dotColor = '#FFF';
  showCaptions = true;
  captionColor = '#FFF';
  captionBackground = 'rgba(0, 0, 0, .35)';
  lazyLoad = false;
  width = '75vw';

  tiles: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
    private userService: UserService,
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
    this.user = this.userService.user$;
    this.route.params.subscribe(params => {
      this.projectsService.getProject(params['uid']).subscribe(data => {
        this.currentProject = data;
        this.currentProject.pics.map((pic, index) => {
          if (index < 3) {
            this.urls.push(pic.url);
          }
        });
        this.tiles = [
          { text: `Money raised so Far { ${this.currentProject.totMoneyRaised} }`, cols: 3, rows: 1, color: '#B33771' },
          { text: `# of Investors {  ${this.currentProject.totInvestors} }`, cols: 1, rows: 1, color: '#FD7272' },
          { text: `Deadline { ${this.currentProject.endDate} }`, cols: 2, rows: 1, color: '#58B19F' },
          { text: `It all started on { ${this.currentProject.startDate} }`, cols: 2, rows: 1, color: '#B33771' },
          { text: `Money Needed { ${this.currentProject.totMoneyNeeded} }`, cols: 4, rows: 1, color: '#2C3A47' }
        ];
      });
    });
  }

  deleteImage() {
    this.projectsService.deleteImage(0);
  }
}
