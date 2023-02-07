import { allTutorialsLoaded } from './tutorials.actions';

import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {concatMap, map} from 'rxjs/operators';
import { TutorialActions } from './action-types';
import { TutorialsHttpService } from './services/tutorials-http.service';


@Injectable()
export class TutorialsEffects {

    loadTutorials$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(TutorialActions.loadAllTutorials),
                concatMap(action =>
                    this.tutorialsHttpService.findAllTutorials()),
                map(tutorials => allTutorialsLoaded({tutorials}))

            )
    );

    editTutorial$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(TutorialActions.tutorialUpdated),
                concatMap(action => this.tutorialsHttpService.saveTutorial(
                    action.update.id,
                    action.update.changes
                ))
            ),
        {dispatch: false}
    );

    createTutorial$ = createEffect(
      () => this.actions$
          .pipe(
              ofType(TutorialActions.tutorialSaved),
              concatMap(action => this.tutorialsHttpService.createTutorial(
                  action.tutorial,
                  action.sections
              ))
          ),
      {dispatch: false}
  );

    constructor(private actions$: Actions,
                private tutorialsHttpService: TutorialsHttpService) {

    }

}
