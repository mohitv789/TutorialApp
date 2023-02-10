import {Action} from '@ngrx/store';
import {Section} from './models/Section';
import {Update} from '@ngrx/entity';

export enum SectionActionTypes {

  SectionsRequested = '[Tutorial Landing Page] Sections Requested',
  SectionsLoaded = '[Tutorial API] Sections Loaded',
  SectionsUpdated = "[Tutorial Edit Section] Section Updated",
}


export class SectionsRequested implements Action {

  readonly type = SectionActionTypes.SectionsRequested;

  constructor(public payload:{tutorialId: string}) {}

}

export class SectionsLoaded implements Action {

  readonly type = SectionActionTypes.SectionsLoaded;

  constructor(public payload:{sections: Section[]}) {}

}

export class SectionsUpdated implements Action {

  readonly type = SectionActionTypes.SectionsUpdated;

  constructor(public payload:{section: Update<Section>,tutorialId: string,sectionId:string}) {}

}


export type SectionsActions =
  | SectionsRequested
  | SectionsLoaded
  | SectionsUpdated
