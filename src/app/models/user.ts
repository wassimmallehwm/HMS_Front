import { Role } from "./role";

export class User {
  id: number;
  username: string;
  name: string;
  email: string;
  roles: Role[];
  password: string;

  constructor(username?: string, name?: string, roles?: Role,
    email?: string, password?: string) {
    this.username = username;
    this.name = name;
    this.email = email;
    this.roles = [roles];
    this.password = password;
  }
}
