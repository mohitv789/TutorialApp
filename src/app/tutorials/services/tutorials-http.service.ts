import { AppState } from './../../reducers/index';
import { Section } from './../models/Section';
import { Tutorial } from './../models/Tutorial';
import firebase from 'firebase/compat/app';
import OrderByDirection = firebase.firestore.OrderByDirection;
import {Injectable} from "@angular/core";
import {HttpParams} from "@angular/common/http";
import {Observable, from, of} from "rxjs";
import {concatMap, map} from "rxjs/operators";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { convertSnaps } from './db-utils';
import { Store } from '@ngrx/store';
import { loadAllTutorials } from '../tutorials.actions';



@Injectable()
export class TutorialsHttpService {

    constructor(private db: AngularFirestore,private store: Store<AppState>) {

    }

    findAllTutorials(): Observable<Tutorial[]> {
        return this.db.collection('tutorials', ref => ref.orderBy("seqNo"))
        .get()
        .pipe(
            map(results => convertSnaps<Tutorial>(results))
        )
    }

    findTutorialById(tutorialId: string): Observable<Tutorial> {
      return this.db.collection("tutorials",
            ref => ref.where("id", "==", tutorialId))
            .get()
            .pipe(
              map(results => {
                  const tutorials = convertSnaps<Tutorial>(results);
                  return tutorials[0];

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

    updateTutorial(tutorialId: string | number, changes: Partial<Tutorial>):Observable<any> {
      return from(this.db.doc(`tutorials/${tutorialId}`).update({...changes}));
    }

    updateSection(updatedSection: Partial<Section>):Observable<any> {
      let sectionId = {...updatedSection}.id;
      let tutorialId = {...updatedSection}.tutorialId

      return from(this.db.doc(`tutorials/${tutorialId}/sections/${sectionId}`).update({...updatedSection}));


    }

    deleteTutorial(tutorialId:string) {
      return this.db.collection(`tutorials/${tutorialId}/sections`)
          .get()
          .pipe(
              concatMap(results => {

                  const sections = convertSnaps<Section>(results);

                  const batch = this.db.firestore.batch();

                  const tutorialRef = this.db.doc(`tutorials/${tutorialId}`).ref;

                  batch.delete(tutorialRef);

                  for (let section of sections) {
                      const sectionRef =
                          this.db.doc(`tutorials/${tutorialId}/sections/${section.id}`).ref;

                      batch.delete(sectionRef);
                  }

                  return from(batch.commit());

              })
          );
  }

    createTutorial(tutorialId: string,newTutorial: Partial<Tutorial>,newSections: Partial<Section[]>) {
      return this.db.collection("tutorials",
              ref => ref.orderBy("seqNo", "desc").limit(1))
          .get()
          .pipe(
              concatMap(result => {
                  const loggedInUser = JSON.parse(localStorage.getItem("user")!).uid;
                  const tutorials = convertSnaps<Tutorial>(result);

                  const lastTutorialSeqNo = tutorials[0]?.seqNo ?? 0;

                  const tutorial = {
                      ...newTutorial,
                      owner:loggedInUser,
                      seqNo: lastTutorialSeqNo + 1
                  }


                  this.store.dispatch(loadAllTutorials());
                  return this.db.collection("tutorials").add(tutorial).then(
                    (result) => {
                      this.db.collection(`tutorials`).doc(result.id).set({id: result.id,...tutorial});
                      newSections.forEach((section: any) => {
                        this.createSection(result.id,section)
                      })
                    }
                  );

          })
        )}

  createSection(tutorialId: string,newSection: Partial<Section>) {
    return this.db.collection(`tutorials/${tutorialId}/sections`).add({...newSection}).then(
            (resp) => {
              let sectionId = resp.id;
              return this.db.collection(`tutorials/${tutorialId}/sections`).doc(sectionId).set({id: sectionId,...newSection,tutorialId:tutorialId});
            }
          )
    }
}
