import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Project } from '../models/project.model';
import { User } from './../models/user.model';
import { FilesService } from './files.service';
import { UserService } from './user.service';

@Injectable()
export class ProjectsService implements OnInit {
  projects$: Observable<Project[]>;
  projectsCollection: AngularFirestoreCollection<Project>;
  user$: Observable<User>;

  constructor(
    private afs: AngularFirestore,
    private router: Router,
    private userService: UserService,
    private fileService: FilesService
  ) {
    this.afs.firestore.settings({ timestampsInSnapshots: true });
    this.user$ = this.userService.user$;
  }

  ngOnInit() {}

  getProjects() {
    this.projectsCollection = this.afs.collection<Project>('projects');
    this.projectsCollection.valueChanges().subscribe(projects => {
      projects.map(project => {
        if (project.endDate <= Date.now()) {
          this.markProjectAsExpired(project);
        }
      });
    });
    return (this.projects$ = this.projectsCollection.valueChanges());
  }

  createProject(newProject: Project): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const projectRef: AngularFirestoreDocument<any> = this.afs.doc(`projects/${newProject.uid}`);
      const createdProject: Project = {
        uid: newProject.uid,
        name: newProject.name,
        info: newProject.info,
        totMoneyRaised: 0,
        totInvestors: 0,
        oneLiner: newProject.oneLiner,
        totMoneyNeeded: newProject.totMoneyNeeded,
        startDate: newProject.startDate,
        endDate: newProject.endDate,
        pics: JSON.parse(JSON.stringify(newProject.pics)),
        videoLink: newProject.videoLink,
        thumbnail: JSON.parse(JSON.stringify(newProject.thumbnail)),
        owner: null,
        investors: [],
        views: 0,
        completed: false,
        expired: false
      };
      this.user$.pipe(take(1)).subscribe(user => {
        createdProject.owner = user.uid;
        console.log(createdProject);
        projectRef
          .set(createdProject, { merge: true })
          .then(() => {
            resolve(createdProject.uid);
          })
          .catch(() => {
            reject();
          });
      });
    });
  }

  getProject(uid: string) {
    return this.afs.doc<Project>(`projects/${uid}`).valueChanges();
  }

  updateDonation(amount: number, project: Project): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const projectRef: AngularFirestoreDocument<any> = this.afs.doc(`projects/${project.uid}`);
      project.totMoneyRaised = project.totMoneyRaised + amount;
      if (project.totMoneyNeeded <= project.totMoneyRaised) {
        project.completed = true;
        project.expired = false;
      }
      project.totInvestors++;
      this.user$.pipe(take(1)).subscribe(user => {
        project.investors.push({
          investorId: user.uid,
          amount: amount,
          date: Date.now()
        });
        projectRef
          .set(project, { merge: true })
          .then(() => {
            resolve(true);
          })
          .catch(() => {
            reject(false);
          });
      });
    });
  }

  updateProjectViews(project: Project): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const projectRef: AngularFirestoreDocument<any> = this.afs.doc(`projects/${project.uid}`);
      project.views++;
      projectRef
        .set(project, { merge: true })
        .then(() => {
          resolve(true);
        })
        .catch(() => {
          reject(false);
        });
    });
  }

  markProjectAsExpired(project: Project): Promise<any> {
    console.log('checking');
    return new Promise<any>((resolve, reject) => {
      const projectRef: AngularFirestoreDocument<any> = this.afs.doc(`projects/${project.uid}`);
      project.expired = true;
      project.completed = true;
      projectRef
        .set(project, { merge: true })
        .then(() => {
          resolve(true);
        })
        .catch(() => {
          reject(false);
        });
    });
  }
}
