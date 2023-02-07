import { Tutorial } from './models/Tutorial';
import {createAction, props} from '@ngrx/store';
import {Update} from '@ngrx/entity';
import {UpdateStr} from '@ngrx/entity/src/models';
import { Section } from './models/Section';


export const loadAllTutorials = createAction(
    "[Tutorials Resolver] Load All Tutorials"
);


export const allTutorialsLoaded = createAction(
    "[Load Tutorials Effect] All Tutorials Loaded",
    props<{tutorials: Tutorial[]}>()
);


export const tutorialUpdated = createAction(
  "[Edit Tutorial Dialog] Tutorial Updated",
  props<{update: Update<Tutorial>}>()
);

export const tutorialSaved = createAction(
  "[Create Tutorial] Tutorial Created",
  props<{tutorial: any,sections: any[]}>()
);

