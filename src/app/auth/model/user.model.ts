export interface IUser {
  uid: string;
  email?: string;
  displayName?: string;
  profilePic? : string;
  loading?: boolean;
  error?: string;
}

export class User {
  constructor(public uid: string) {}
}
