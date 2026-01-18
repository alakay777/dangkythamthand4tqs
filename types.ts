
export interface SoldierInfo {
  fullName: string;
  dob: string;
  rank: string;
  position: string;
  squad: string;
  platoon: string;
  company: string;
  homeTown: string;
}

export interface VisitorInfo {
  fullName: string;
  dob: string;
  idNumber: string;
  address: string;
  relationship: string;
  visitorCount: number;
  visitTime: string;
}

export interface RegistrationData {
  soldier: SoldierInfo;
  visitor: VisitorInfo;
  agreedToRules: boolean;
}

export enum FormStep {
  Rules = 0,
  SoldierInfo = 1,
  VisitorInfo = 2,
  Review = 3,
  Success = 4
}
