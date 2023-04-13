import { Tutorial } from './models/Tutorial';
import {createAction, props} from '@ngrx/store';
import {Update} from '@ngrx/entity';


export const loadAllTutorials = createAction(
    "[Tutorials Resolver] Load All Tutorials"
);
export const singleTutorialRequested = createAction(
  "[Tutorial Resolver] Load Tutorial by ID",
  props<{tutorialId: string}>()
);

export const allTutorialsLoaded = createAction(
    "[Load Tutorials Effect] All Tutorials Loaded",
    props<{tutorials: Tutorial[]}>()
);

export const singleTutorialLoaded = createAction(
  "[Load Tutorials Effect] Single Tutorial Loaded",
  props<{tutorial: Tutorial}>()
);

export const tutorialUpdated = createAction(
  "[Edit Tutorial Dialog] Tutorial Updated",
  props<{update: Update<Tutorial>}>()
);

export const tutorialSaved = createAction(
  "[Create Tutorial] Tutorial Created",
  props<{tutorialId: string, tutorial: any,sections: any[]}>()
);

export const tutorialDeleted = createAction(
  "[Delete Tutorial] Tutorial Deleted",
  props<{tutorialId: string}>()
);
