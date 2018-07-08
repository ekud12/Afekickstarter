import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Permissions } from './../models/permissions.model';
import { LoginRequest, RegisterRequest, User } from './../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {
  user$: Observable<User>;
  errorsData: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  getErrors() {
    return of(this.errorsData);
  }

  emailSignUp(request: RegisterRequest) {
    console.log(request);
    return this.afAuth.auth
      .createUserWithEmailAndPassword(request.email, request.password)
      .then(user => {
        return this.updateUserData(user.user, request);
      })
      .catch(error => this.errorsData.next(error.message));
  }

  signOut() {
    this.afAuth.auth.signOut();
    this.router.navigate(['login']);
  }

  signIn(req: LoginRequest) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(req.email, req.password)
      .then(value => {
        console.log(value);
        this.router.navigate(['home']);
      })
      .catch(error => this.errorsData.next(error.message));
  }

  private updateUserData(user, customData: RegisterRequest) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    console.log(customData);
    const data: User = {
      uid: user.uid,
      name: customData.name,
      email: user.email,
      roles: {
        admin: customData.role === Permissions.ADMIN,
        investor: customData.role === Permissions.INVESTOR,
        projectOwner: customData.role === Permissions.PROJECT_OWNER
      }
    };
    userRef.set(data, { merge: true });
    return this.router.navigate(['home']);
  }

  canInvest(user: User): boolean {
    const allowed = ['admin', 'investor', 'projectOwner'];
    return this.checkAuthorization(user, allowed);
  }

  canEdit(user: User): boolean {
    const allowed = ['admin', 'projectOwner'];
    return this.checkAuthorization(user, allowed);
  }

  isAdmin(user: User): boolean {
    const allowed = ['admin'];
    return this.checkAuthorization(user, allowed);
  }

  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) {
      console.log('no user');
      return false;
    }
    for (const role of allowedRoles) {
      if (user.roles[role]) {
        console.log('authorized');
        return true;
      }
    }
    console.log('NOT authorized');
    return false;
  }

  ngOnDestroy() {}
}
