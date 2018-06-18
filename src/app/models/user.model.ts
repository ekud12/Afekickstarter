import { Roles } from './permissions.model';
export interface User {
  uid: string;
  name: string;
  email: string;
  roles: Roles;
}

export class RegisterRequest {
  constructor() {}
  email: string;
  password: string;
  name: string;
  role: Roles;
}
