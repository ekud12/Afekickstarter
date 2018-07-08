import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FileUpload } from '../models/file.model';
import { Pic, Project } from '../models/project.model';
@Injectable()
export class FilesService {
  private basePath = '/uploads';
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  filesToUpload: Array<Pic> = new Array<Pic>(3);
  count: number;
  tasks = new Array<Promise<any>>(3);

  constructor(private afs: AngularFirestore, private afstorage: AngularFireStorage) {
    this.filesToUpload = [{ url: '', key: '' }, { url: '', key: '' }, { url: '', key: '' }];
  }

  uploadFile(key: string, files: Array<File>): Promise<any> {
    files.map((item, index) => {
      this.tasks.push(
        new Promise((resolve, reject) => {
          const file = new FileUpload(item);
          const id = Math.random()
            .toString(36)
            .substring(2);
          const fileRef = this.afstorage.ref(id);
          file.key = id;
          file.projectID = key;
          const task = this.afstorage.ref(id).put(item);
          task
            .snapshotChanges()
            .pipe(
              finalize(() => {
                fileRef.getDownloadURL().subscribe(url => {
                  const pic = new Pic();
                  pic.url = url;
                  pic.key = id;
                  this.filesToUpload[index] = pic;
                  this.count++;
                  resolve();
                });
              })
            )
            .subscribe();
        })
      );
    });
    return new Promise((resolve, rejected) => {
      Promise.all(this.tasks)
        .then(() => {
          resolve(this.filesToUpload);
        })
        .catch(e => {
          console.log(e);
          rejected();
        });
    });
  }

  saveFileData(newPics: Array<Pic>, p_id: string): Promise<any> {
    return new Promise((resolve, rejected) => {
      const projectRef: AngularFirestoreDocument<Project> = this.afs.doc(`projects/${p_id}`);
      const newproj: Project = {
        pics: newPics
      };
      projectRef
        .set(Object.assign({}, newproj), { merge: true })
        .then(() => resolve())
        .catch(e => rejected(e));
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

  private deleteFileStorage(fileKey: string) {
    const storageRef = this.afstorage.ref(fileKey);
    storageRef.delete();
  }
}
