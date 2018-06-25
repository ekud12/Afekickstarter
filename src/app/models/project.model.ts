import { User } from './user.model';

export class Project {
  uid?: string;
  name?: string;
  info?: string;
  totMoneyNeeded?: number;
  totMoneyRaised?: number;
  totInvestors?: number;
  startDate?: Date;
  endDate?: Date;
  thumbnail?: string;
  pic1: string;
  pic2?: string;
  pic3?: string;
  videoLink?: string;
  owner?: string;
}
