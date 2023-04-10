import { Section } from './../models/Section';
import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable, BehaviorSubject, of} from "rxjs";


import {catchError, finalize, tap} from 'rxjs/operators';
import {AppState} from '../../reducers';
import {select, Store} from '@ngrx/store';
import { selectSections } from '../sections.selector';
import { SectionsRequested } from '../section.actions';



export class SectionsDataSource implements DataSource<Section> {

    private sectionsSubject = new BehaviorSubject<Section[]>([]);

    constructor(private store: Store<AppState>) {

    }

    loadSections(tutorialId:string) {
        this.store
          .pipe(
            select(selectSections(tutorialId)),
            tap(sections => {
              if (sections.length > 0) {
                this.sectionsSubject.next(sections);
              }
              else {
                this.store.dispatch(new SectionsRequested({tutorialId}));
              }
            }),
            catchError(() => of([]))
          )
          .subscribe();

    }

    connect(collectionViewer: CollectionViewer): Observable<Section[]> {
        console.log("Connecting data source");
        return this.sectionsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.sectionsSubject.complete();
    }

}
