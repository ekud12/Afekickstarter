import { Injectable } from '@angular/core';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  userCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;
}
