import { Permissions, Roles } from './permissions.model';
export interface User {
  uid: string;
  name: string;
  email: string;
  roles: Roles;
}

export class RegisterRequest {
  constructor() {}
  email = '';
  password = '';
  name: string;
  role: Permissions;
}

export class LoginRequest {
  constructor() {}
  email = '';
  password = '';
}
