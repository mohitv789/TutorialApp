import {Action, createAction, props} from '@ngrx/store';
import {Section} from './models/Section';
import {Update} from '@ngrx/entity';

export const SectionsRequested = createAction(
  '[Tutorial Landing Page] Sections Requested',
  props<{tutorialId: string}>()
);

export const SectionsLoaded = createAction(
  '[Tutorial API] Sections Loaded',
  props<{sections: Section[]}>()
);

export const SectionUpdated = createAction(
  "[Edit Section Dialog] Section Updated",
  props<{update: Update<Section>}>()
);

export const SectionSaved = createAction(
  "[Create Section] Section Created",
  props<{tutorialId: string, section: any}>()
);
