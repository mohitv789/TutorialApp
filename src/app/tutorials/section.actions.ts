import {Action} from '@ngrx/store';
import {Section} from './models/Section';


export enum SectionActionTypes {

  SectionsRequested = '[Course Landing Page] Lessons Requested',
  SectionsLoaded = '[Courses API] Lessons Loaded',
}


export class SectionsRequested implements Action {

  readonly type = SectionActionTypes.SectionsRequested;

  constructor(public payload:{tutorialId: string}) {}

}

export class SectionsLoaded implements Action {

  readonly type = SectionActionTypes.SectionsLoaded;

  constructor(public payload:{sections: Section[]}) {}

}




export type SectionsActions =
  | SectionsRequested
  | SectionsLoaded
