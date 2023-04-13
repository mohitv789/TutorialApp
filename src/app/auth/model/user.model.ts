export interface IUser {
  uid: string;
  email?: string;
  displayName?: string;
  profilePic? : string;
  loading?: boolean;
  error?: string;
  inProgressSections? : {
    tutorialId: string,
    sectionId: string,
    progress: string
  }[],
  completedSections? : {
    tutorialId: string,
    sectionId: string
  }[],
}

export class User {
  constructor(public uid: string) {}
}
