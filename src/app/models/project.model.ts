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
  expired?: boolean;
  completed?: boolean;
  views?: number;
  investors?: Investor[];
}

export class Pic {
  constructor() {}
  url: string;
  key: string;
}

export class Investor {
  investorId: string;
  amount: number;
  date: number;
}
