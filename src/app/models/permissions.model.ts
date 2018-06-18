export enum Permissions {
  ADMIN = 1,
  INVESTOR = 2,
  PROJECT_OWNER = 3
}

export interface PermissionsMap {
  value: Permissions;
  viewValue: string;
}

export interface Roles {
  admin?: boolean;
  investor?: boolean;
  projectOwner?: boolean;
}
