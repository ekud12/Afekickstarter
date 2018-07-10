import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Project } from '../../models/project.model';
import { User } from '../../models/user.model';
import { FilesService } from '../../services/files.service';
import { ProjectsService } from '../../services/projects.service';
import { UserService } from '../../services/user.service';
import { DonationBoxComponent } from './../donation-box/donation-box.component';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit, AfterViewInit {
  project: Project;
  user: Observable<User>;
  _allProject$: Observable<Project[]>;
  player: YT.Player;
  currentProject: Project;
  userCanDonate = false;
  urlCache = new Map<string, SafeResourceUrl>();

  updatedView = false;
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
  width = '70vw';

  tiles: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
    private userService: UserService,
    private filesService: FilesService,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog
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

  ngAfterViewInit() {}

  ngOnInit() {
    this._allProject$ = this.projectsService.projects$;
    this.user = this.userService.user$;
    this.user.pipe(filter(user => user !== null)).subscribe(user => {
      this.userCanDonate = this.userService.canInvest(user) && this.currentProject.owner !== user.uid;
    });
    this.route.params.subscribe(params => {
      this.projectsService.getProject(params['uid']).subscribe(data => {
        this.currentProject = data;
        if (!this.updatedView) {
          this.projectsService.updateProjectViews(data);
          this.updatedView = true;
        }
        this.currentProject.pics.map((pic, index) => {
          if (index < 3 && pic.url !== '' && pic.url !== null) {
            this.urls.push(pic.url);
          }
        });
        this.tiles = [
          {
            text: `Money Needed `,
            data: `{ ${this.numberWithCommas(this.currentProject.totMoneyNeeded)}$}`,
            cols: 2,
            rows: 1,
            color: '#ffda79'
          },
          { text: `# of Investors `, data: `{  ${this.currentProject.totInvestors} }`, cols: 2, rows: 1, color: '#cc8e35' },
          {
            text: `Campaign started on `,
            data: `{ ${new Date(this.currentProject.startDate).toUTCString()} }`,
            cols: 2,
            rows: 1,
            color: '#cc8e35'
          },
          {
            text: `Deadline `,
            data: `{ ${new Date(this.currentProject.endDate).toUTCString()} }`,
            cols: 2,
            rows: 1,
            color: '#ffda79'
          },
          {
            text: `Money raised so Far`,
            data: ` { ${this.numberWithCommas(this.currentProject.totMoneyRaised)}$ }`,
            cols: 4,
            rows: 1,
            color: '#ccae62'
          }
        ];
      });
    });
  }

  openDonationBox() {
    const dialogRef = this.dialog.open(DonationBoxComponent, {
      data: this.currentProject,
      height: '300px',
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      } else {
      }
    });
  }

  numberWithCommas(x) {
    const parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }
}
