import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { FileUpload } from '../models/file.model';
import { Pic, Project } from '../models/project.model';
@Injectable()
export class FilesService {
  private basePath = '/uploads';
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;

  constructor(private afs: AngularFirestore, private afstorage: AngularFireStorage) {}

  saveFileData(fileUpload: FileUpload, index: number): Promise<any> {
    return new Promise((resolve, rejected) => {
      const projectRef: AngularFirestoreDocument<Project> = this.afs.doc(`projects/${fileUpload.projectID}`);
      projectRef.ref.get().then(doc => {
        const pics: Array<Pic> = doc.data().pics;
        pics[index] = { key: fileUpload.url, url: fileUpload.key };
        console.log(index);
        console.log(pics[index]);
        console.log(pics);
        const newproj: Project = {
          pics: pics
        };
        projectRef
          .set(newproj, { merge: true })
          .then(() => resolve())
          .catch(() => rejected());
      });
    });
  }

  deleteImage(project: Project) {
    this.deleteFileDatabase(project)
      .then(() => {
        this.deleteFileStorage(project.pics[0].key);
      })
      .catch(error => console.log(error));
  }

  private deleteFileDatabase(project: Project) {
    const projectRef: AngularFirestoreDocument<Project> = this.afs.doc(`projects/${project.uid}`);
    return projectRef.ref.get().then(doc => {
      const pics = doc.data().pics;
      pics.splice(pics.indexOf(item => item.key === project.pics[0].key), 1);
      const newproj: Project = {
        pics: pics
      };
      projectRef.set(newproj, { merge: true });
    });
  }

  private deleteFileStorage(name: string) {
    const storageRef = this.afstorage.ref(name);
    storageRef.delete();
    // storageRef.child(`${this.basePath}/${name}`).delete();
  }
}
