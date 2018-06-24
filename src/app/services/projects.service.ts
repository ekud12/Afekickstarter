import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Project } from '../models/project.model';
import { User } from './../models/user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  projects$: Observable<Project[]>;
  projectsCollection: AngularFirestoreCollection<Project>;
  user$: Observable<User>;
  constructor(private afs: AngularFirestore, private router: Router, private userService: UserService) {
    this.user$ = this.userService.user$;
    this.projectsCollection = this.afs.collection<Project>('projects');
    this.projects$ = this.projectsCollection.valueChanges();
  }

  createProject() {
    const projectRef: AngularFirestoreDocument<any> = this.afs.doc(`projects/firstProject`);
    this.user$.pipe(take(1)).subscribe(user => {
      const data: Project = {
        uid: 'firstProject',
        name: 'best project',
        info: 'asdas',
        totMoneyRaised: 0,
        totInvestors: 0,
        totMoneyNeeded: 0,
        startDate: new Date(),
        endDate: new Date(),
        pic1: 'asd',
        pic2: 'asd',
        pic3: 'asd',
        videoLink: 'video link',
        thumbnail: 'imagethumb',
        owner: user.uid
      };
      projectRef.set(data, { merge: true });
    });
  }

  getProject(uid: string) {
    return this.afs.doc<Project>(`projects/${uid}`).valueChanges();
  }

  deleteProject() {}

  updateProject() {}

  closeProject() {}
}
