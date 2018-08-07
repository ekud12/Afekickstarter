import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { of } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FileUpload } from '../models/file.model';
import { Pic, Project } from '../models/project.model';
@Injectable()
export class FilesService {
  filesToUpload: Array<Pic> = new Array<Pic>(4);
  count = 0;
  counter$ = of(this.count);
  tasks = new Array<Promise<any>>(4);

  constructor(private afs: AngularFirestore, private afstorage: AngularFireStorage) {
    this.filesToUpload = [{ url: '', key: '' }, { url: '', key: '' }, { url: '', key: '' }, { url: '', key: '' }];
  }

  uploadFiles(key: string, files: Array<File>): Promise<any> {
    this.count = 0;
    // map runs a for each loop and gets item and its index, and perform the function
    // in the block.
    files.map((item, index) => {
      // create a tasks array, pushes new promise for every file upload
      // so that we can wait for all of them to finish
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
    // after we added all the tasks for uploading the images, we wait for
    // all of the uploads to finish, and when it does, we resolve with an array
    // containing the urls of the new uploaded images on firebase
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

  // update the newly uploaded images in the relative projects
  saveFileData(newPics: Array<Pic>, p_id: string): Promise<any> {
    return new Promise((resolve, rejected) => {
      const projectRef: AngularFirestoreDocument<Project> = this.afs.doc(`projects/${p_id}`);
      // we create a project object, and change only the images references.
      const newproj: Project = {
        pics: newPics
      };
      // merge: true => this will make sure we only update what we want in the firebase object
      projectRef
        // Object.assign => create a new object by merging all the variables from right to left.
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

  // delete a reference to file on a project document
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

  // delete the file itself from the firebase storage
  private deleteFileStorage(fileKey: string) {
    const storageRef = this.afstorage.ref(fileKey);
    storageRef.delete();
  }
}
