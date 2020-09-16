import { User } from './user';

export class Staff {
  id: number;
  reference: string;
  chief: User;
  members: User[];

  constructor(reference: string, chief?: User, members?: User[]) {
    this.reference = reference;
    this.chief = chief;
    this.members = members;
  }
}
