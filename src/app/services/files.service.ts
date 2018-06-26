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

  // // async pushFileToStorage(fileUpload: FileUpload, progress: { percentage: number }): Promise<any> {
  // //   const storageRef = firebase.storage().ref();
  // //   const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.file.name}`).put(fileUpload.file);
  // //   await uploadTask.on(
  // //     firebase.storage.TaskEvent.STATE_CHANGED,
  // //     snapshot => {
  // //       const snap = snapshot as firebase.storage.UploadTaskSnapshot;
  // //       progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
  // //     },
  // //     error => {
  // //       console.log(error);
  // //     },
  // //     async () => {
  // //       uploadTask.snapshot.ref.getDownloadURL().then(
  // //         async val => {
  // //           fileUpload.url = val;
  // //           fileUpload.name = fileUpload.file.name;
  // //           return Promise.resolve(fileUpload.url);
  // //         },
  // //         error => {
  // //           console.log(error);
  // //         }
  // //       );
  // //     }
  // //   );
  // // }

  // uploadFile(file: File) {
  //   const id = Math.random()
  //     .toString(36)
  //     .substring(2);
  //   this.ref = this.afstorage.ref(id);
  //   this.task = this.ref.put(file);
  //   this.uploadProgress = this.task.percentageChanges();
  //   return this.task.task.snapshot.downloadURL();
  // }

  saveFileData(fileUpload: FileUpload, index: number): void {
    const projectRef: AngularFirestoreDocument<Project> = this.afs.doc(`projects/${fileUpload.projectID}`);
    projectRef.ref.get().then(doc => {
      const pics = doc.data().pics;
      console.log(index);
      pics[index] = fileUpload.url;
      const newproj: Project = {
        pics: pics
      };
      projectRef.set(newproj, { merge: true });
    });
  }

  deleteImage(index: number) {}
  // // getFileUploads(numberItems): AngularFireList<FileUpload> {
  // //   return this.db.list(this.basePath, ref => ref.limitToLast(numberItems));
  // // }

  // // deleteFileUpload(fileUpload: FileUpload) {
  // //   this.deleteFileDatabase(fileUpload.key)
  // //     .then(() => {
  // //       this.deleteFileStorage(fileUpload.name);
  // //     })
  // //     .catch(error => console.log(error));
  // // }

  private deleteFileDatabase(key: string) {
    return this.afs.collection(`${this.basePath}/`);
  }

  private deleteFileStorage(name: string) {
    const storageRef = this.afstorage.ref(name);
    storageRef.delete();
    // storageRef.child(`${this.basePath}/${name}`).delete();
  }
}
