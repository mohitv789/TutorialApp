import { SectionsActions, SectionActionTypes, SectionsLoaded } from './../section.actions';

import { AppState } from './../../reducers/index';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createReducer, on} from '@ngrx/store';
import { compareSections, Section } from '../models/Section';
import {TutorialActions} from '../action-types';

export interface  SectionState extends EntityState<Section> {
  loading: boolean
}
export const adapterS = createEntityAdapter<Section>({
  sortComparer: compareSections,
  selectId: Section => Section.id
});

export const initialSectionState = adapterS.getInitialState({
  loading:false
});

export function sectionsReducer( state = initialSectionState, action: SectionsActions ): SectionState {
  switch(action.type) {


    case SectionActionTypes.SectionsRequested:
      return {
        ...state,
        loading:true
      };

    case SectionActionTypes.SectionsLoaded:

      return adapterS.addMany(action.payload.sections, {...state, loading:false});

    case SectionActionTypes.SectionsUpdated:
      return adapterS.updateOne(action.payload.section, {...state, loading:false});


    default:

      return state;

  }
}
export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal

} = adapterS.getSelectors();
