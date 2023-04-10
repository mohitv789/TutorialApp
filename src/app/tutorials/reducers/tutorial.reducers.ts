import { Tutorial } from './../models/Tutorial';
import {compareTutorials} from '../models/Tutorial';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createReducer, on} from '@ngrx/store';
import {TutorialActions} from '../action-types';
import { compareSections, Section } from '../models/Section';


export interface TutorialsState extends EntityState<Tutorial> {
    allTutorialsLoaded: boolean,
}


export const adapterT = createEntityAdapter<Tutorial>({
    sortComparer: compareTutorials,
    selectId: Tutorial => Tutorial.id
});


export const initialTutorialsState = adapterT.getInitialState({
    allTutorialsLoaded:false,
});


export const tutorialsReducer = createReducer(

  initialTutorialsState,

    on(TutorialActions.allTutorialsLoaded,
        (state, action) => adapterT.setAll(
            action.tutorials,
            {...state,
              allTutorialsLoaded:true
            })),
    on(TutorialActions.tutorialUpdated, (state, action) =>
        adapterT.updateOne(action.update, state) ),

    on(TutorialActions.tutorialSaved, (state, action) =>
        adapterT.addOne(action.tutorial, state) )

);
export const {
  selectAll
} = adapterT.getSelectors();
