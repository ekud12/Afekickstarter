import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { FileUpload } from '../models/file.model';
import { Project } from '../models/project.model';

@Injectable()
export class FilesService {
  private basePath = '/uploads';

  constructor(private afs: AngularFirestore) {}

  pushFileToStorage(fileUpload: FileUpload, progress: { percentage: number }) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.file.name}`).put(fileUpload.file);

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot => {
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
        progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
      },
      error => {
        console.log(error);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(val => {
          fileUpload.url = val;
          fileUpload.name = fileUpload.file.name;
          fileUpload.projectID = 'firstProject';
          fileUpload.imgNum = 1;
          this.saveFileData(fileUpload);
        });
      }
    );
  }

   saveFileData(fileUpload: FileUpload) {
    console.log(fileUpload);
    console.log(fileUpload.url);
    const url = fileUpload.url;
    console.log(url);
    const projectRef: AngularFirestoreDocument<any> = this.afs.doc(`projects/${fileUpload.projectID}`);
    const newproj: Project = {
      pic1: url
    };
    console.log(url);
    projectRef.set(newproj, { merge: true });
  }

  // getFileUploads(numberItems): AngularFireList<FileUpload> {
  //   return this.db.list(this.basePath, ref => ref.limitToLast(numberItems));
  // }

  // deleteFileUpload(fileUpload: FileUpload) {
  //   this.deleteFileDatabase(fileUpload.key)
  //     .then(() => {
  //       this.deleteFileStorage(fileUpload.name);
  //     })
  //     .catch(error => console.log(error));
  // }

  // private deleteFileDatabase(key: string) {
  //   return this.db.list(`${this.basePath}/`).remove(key);
  // }

  // private deleteFileStorage(name: string) {
  //   const storageRef = firebase.storage().ref();
  //   storageRef.child(`${this.basePath}/${name}`).delete();
  // }
}
