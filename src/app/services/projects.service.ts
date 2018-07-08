import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Project } from '../models/project.model';
import { User } from './../models/user.model';
import { FilesService } from './files.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
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
    this.projectsCollection = this.afs.collection<Project>('projects');
    this.projects$ = this.projectsCollection.valueChanges();
  }

  createProject(newProject: Project): Promise<any> {
    console.log(newProject.pics);
    return new Promise<any>((resolve, reject) => {
      const projectRef: AngularFirestoreDocument<any> = this.afs.doc(`projects/${newProject.uid}`);
      const projectToADD: Project = {
        uid: newProject.uid,
        name: newProject.name,
        info: newProject.info,
        totMoneyRaised: 0,
        totInvestors: 0,
        totMoneyNeeded: 0,
        startDate: Date.now(),
        endDate: new Date().getMilliseconds(),
        pics: JSON.parse(JSON.stringify(newProject.pics)),
        videoLink: newProject.videoLink,
        thumbnail: newProject.thumbnail,
        owner: null
      };
      this.user$.pipe(take(1)).subscribe(user => {
        projectToADD.owner = user.uid;
        console.log(projectToADD);
        projectRef
          .set(projectToADD, { merge: true })
          .then(() => {
            resolve(projectToADD.uid);
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

  deleteProject() {}

  updateProject() {}

  closeProject() {}

  deleteImage(index: number) {
    // this.fileService.deleteImage(0);
  }
}
