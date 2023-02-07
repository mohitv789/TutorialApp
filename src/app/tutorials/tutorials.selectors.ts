import {createFeatureSelector, createSelector} from '@ngrx/store';
import { TutorialsState } from './reducers/tutorial.reducers';
import * as fromTutorials from './reducers/tutorial.reducers';


export const selectTutorialsState =
    createFeatureSelector<TutorialsState>("tutorials");



export const selectAllTutorials = createSelector(
    selectTutorialsState,
    fromTutorials.selectAll
);

export const selectTutorials = createSelector(
    selectAllTutorials,
    tutorials => tutorials
);

export const areTutorialsLoaded = createSelector(
    selectTutorialsState,
    state => state.allTutorialsLoaded
);
