export interface IUser {
  uid: string;
  email?: string;
  displayName?: string;
  loading?: boolean;
  error?: string;
}

export class User {
  constructor(public uid: string) {}
}
