export class Project {
  uid?: string;
  name?: string;
  info?: string;
  totMoneyNeeded?: number;
  totMoneyRaised?: number;
  totInvestors?: number;
  startDate?: number;
  endDate?: number;
  thumbnail?: Pic;
  pics: Pic[];
  videoLink?: string;
  owner?: string;
}

export class Pic {
  constructor() {}
  url: string;
  key: string;
}
