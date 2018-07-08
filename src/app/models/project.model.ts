export class Project {
  uid?: string;
  name?: string;
  info?: string;
  totMoneyNeeded?: number;
  totMoneyRaised?: number;
  totInvestors?: number;
  startDate?: number;
  endDate?: number;
  thumbnail?: string;
  pics: Pic[];
  videoLink?: string;
  owner?: string;
}

export class Pic {
  constructor() {}
  url: string;
  key: string;
}
