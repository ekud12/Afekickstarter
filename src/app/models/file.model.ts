import { User } from './user.model';

export class FileUpload {
  key: string;
  name: string;
  url: string;
  file: File;

  constructor(file: File) {
    this.file = file;
  }
}

export class KickProject {
  key: string;
  name: string;
  desc: string;
  img1: string;
  img2: string;
  img3: string;
  videoLink: string;
  backers: User[];
  totalRaised: number;
  totalNeeded: number;
  startDate: Date;
  expireyDate: Date;
}
