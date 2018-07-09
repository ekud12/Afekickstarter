import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Project } from '../models/project.model';
import { User } from './../models/user.model';
import { FilesService } from './files.service';
import { UserService } from './user.service';

@Injectable()
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
  }
  getProjects() {
    this.projectsCollection = this.afs.collection<Project>('projects');
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
        totMoneyNeeded: 0,
        startDate: newProject.startDate,
        endDate: newProject.endDate,
        pics: JSON.parse(JSON.stringify(newProject.pics)),
        videoLink: newProject.videoLink,
        thumbnail: JSON.parse(JSON.stringify(newProject.thumbnail)),
        owner: null
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

  getAllProjects(): Observable<Project[]> {
    return this.projects$;
  }

  deleteProject() {}

  updateProject() {}

  closeProject() {}

  deleteImage(index: number) {
    // this.fileService.deleteImage(0);
  }
}
