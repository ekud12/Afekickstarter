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
  pics: Pic[];
  videoLink?: string;
  owner?: string;
}

export class Pic {
  url: string;
  key: string;
}
