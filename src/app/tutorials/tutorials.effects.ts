import { SectionsLoaded, SectionUpdated, SectionsRequested, SectionSaved } from './section.actions';
import { allTutorialsLoaded } from './tutorials.actions';

import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {concatMap, map, mergeMap} from 'rxjs/operators';
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


    loadTutorialSections$ = createEffect(
      () => this.actions$
          .pipe(
              ofType(SectionsRequested),
              concatMap(action=> (
                this.tutorialsHttpService.findSections(action.tutorialId))),
              map(sections => SectionsLoaded({sections}))
          )
  );


    editTutorial$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(TutorialActions.tutorialUpdated),
                concatMap(action => this.tutorialsHttpService.updateTutorial(
                    action.update.id,
                    action.update.changes
                ))
            ),
        {dispatch: false}
    );

    editSections$ = createEffect(
      () => this.actions$
          .pipe(
              ofType(SectionUpdated),
              concatMap( action => (
                this.tutorialsHttpService.updateSection(action.update.changes)))
          ),
      {dispatch: false}
  );

    createTutorial$ = createEffect(
      () => this.actions$
          .pipe(
              ofType(TutorialActions.tutorialSaved),
              concatMap(action => this.tutorialsHttpService.createTutorial(
                  action.tutorialId,
                  action.tutorial,
                  action.sections
              ))
          ),
      {dispatch: false}
  );

  createSection$ = createEffect(
    () => this.actions$
        .pipe(
            ofType(SectionSaved),
            concatMap(action => this.tutorialsHttpService.createSection(
                action.tutorialId,
                action.section
            ))
        ),
    {dispatch: false}
);

    constructor(private actions$: Actions,
                private tutorialsHttpService: TutorialsHttpService) {

    }

}
