
export class FileUpload {
  key: string;
  name: string;
  url: string;
  file: File;
  projectID: string;
  imgNum: number;

  constructor(file: File) {
    this.file = file;
  }
}

