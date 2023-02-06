import { Section } from './../models/Section';
import { Tutorial } from './../models/Tutorial';
import firebase from 'firebase/compat/app';
import OrderByDirection = firebase.firestore.OrderByDirection;
import {Injectable} from "@angular/core";
import {HttpParams} from "@angular/common/http";
import {Observable, from} from "rxjs";
import {concatMap, map} from "rxjs/operators";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { convertSnaps } from './db-utils';


@Injectable()
export class CoursesHttpService {

    constructor(private db: AngularFirestore) {

    }

    findAllTutorials(): Observable<Tutorial[]> {
        return this.db.collection('tutorials', ref => ref.orderBy("seqNo"))
        .get()
        .pipe(
            map(results => convertSnaps<Tutorial>(results))
        )
    }

    findTutorialById(tutorialId: string): Observable<Tutorial | null> {
      return this.db.collection("tutorials",
            ref => ref.where("id", "==", tutorialId))
            .get()
            .pipe(
              map(results => {

                  const tutorials = convertSnaps<Tutorial>(results);

                  return tutorials.length == 1 ? tutorials[0] : null;

              })
            );
    }

    findSections(tutorialId:string,sortOrder: OrderByDirection = 'asc'): Observable<Section[]> {
        return this.db.collection(`tutorials/${tutorialId}/sections`,
            ref => ref.orderBy("seqNo",sortOrder))
        .get()
        .pipe(
            map(results => convertSnaps<Section>(results))
        )
    }

    deleteTutorial(tutorialId:string) {
      return from(this.db.doc(`tutorials/${tutorialId}`).delete());
    }

    updateTutorial(tutorialId:string, changes: Partial<Tutorial>):Observable<any> {
        return from(this.db.doc(`tutorials/${tutorialId}`).update(changes));
    }

    createTutorial(newTutorial: Partial<Tutorial>, tutorialId?:string) {
      return this.db.collection("tutorials",
              ref => ref.orderBy("seqNo", "desc").limit(1))
          .get()
          .pipe(
              concatMap(result => {

                  const tutorials = convertSnaps<Tutorial>(result);

                  const lastTutorialSeqNo = tutorials[0]?.seqNo ?? 0;

                  const tutorial = {
                      ...newTutorial,
                      seqNo: lastTutorialSeqNo + 1
                  }

                  let save$: Observable<any>;

                  if (tutorialId) {
                      save$ = from(this.db.doc(`tutorials/${tutorialId}`).set(tutorial));
                  }
                  else {
                      save$ = from(this.db.collection("tutorials").add(tutorial));
                  }

                  return save$
                      .pipe(
                          map(res => {
                              return {
                                  id: tutorialId ?? res.id,
                                  ...tutorial
                              }
                          })
                      );


              })
          )
  }
}
