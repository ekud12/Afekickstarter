import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { FileUpload } from '../models/file.model';
import { Project } from '../models/project.model';
@Injectable()
export class FilesService {
  private basePath = '/uploads';
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;

  constructor(private afs: AngularFirestore, private afstorage: AngularFireStorage) {}

  saveFileData(fileUpload: FileUpload, index: number): void {
    console.log(fileUpload);
    const projectRef: AngularFirestoreDocument<Project> = this.afs.doc(`projects/${fileUpload.projectID}`);
    projectRef.ref.get().then(doc => {
      const pics = doc.data().pics;
      pics[index] = { url: fileUpload.url, key: fileUpload.key };
      const newproj: Project = {
        pics: pics
      };
      projectRef.set(newproj, { merge: true });
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
