import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createReducer, on} from '@ngrx/store';
import { compareSections, Section } from '../models/Section';
import { SectionActions } from '../section-action-types';

export interface  SectionState extends EntityState<Section> {

}
export const adapterS = createEntityAdapter<Section>({
  sortComparer: compareSections,
  selectId: Section => Section.id
});

export const initialSectionState = adapterS.getInitialState({

});

export const sectionsReducer = createReducer(

  initialSectionState,

    on(SectionActions.SectionsLoaded,
        (state, action) => adapterS.addMany(
            action.sections,
            {
              ...state
            })),
    on(SectionActions.SectionUpdated, (state, action) =>
        adapterS.updateOne(action.update, state) ),
    on(SectionActions.SectionSaved, (state, action) =>
        adapterS.addOne(action.section, state) )

);
export const {
  selectAll
} = adapterS.getSelectors();
