import {createFeatureSelector, createSelector} from '@ngrx/store';
import { SectionState } from './reducers/sections.reducers';
import * as fromSections from './reducers/sections.reducers';


export const selectSectionsState =
    createFeatureSelector<SectionState>("sections");



export const selectAllSections = createSelector(
  selectSectionsState,
  fromSections.selectAll
);

export const selectSections = (tutorialId:string) => createSelector(
  selectAllSections,
  sections => {
    return sections.filter(section => section.tutorialId == tutorialId)
  }
);
