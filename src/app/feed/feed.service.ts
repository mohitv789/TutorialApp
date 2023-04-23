import {Injectable} from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { TutorialsHttpService } from '../tutorials/services/tutorials-http.service';
import { Section } from '../tutorials/models/Section';
import { Observable, map, of, take } from "rxjs";
import { Tutorial } from "../tutorials/models/Tutorial";
import { Store, select } from "@ngrx/store";
import { AppState } from "../reducers";
import { getAuth } from "firebase/auth";
import { selectTutorialById } from "../tutorials/tutorials.selectors";
import { selectSections } from "../tutorials/sections.selector";

import firebase from 'firebase/compat/app';
import { convertSnaps } from "../tutorials/services/db-utils";

@Injectable({
  providedIn: "root"
})
export class FeedHttpService {
  tutorialList: string[] = [];
  inprogressFeed: string[] = [];
  completedFeed: string[] = [];

  constructor(private db: AngularFirestore,private http: TutorialsHttpService,
    private store: Store<AppState>,) {

  }

  generateTutList() {

  }

  generateFeed() {
    const userid = JSON.parse(localStorage.getItem("user")!).uid;

    this.db.collection("feed").doc(userid).get().subscribe((res:any) => {

      res.data()["visitedTuts"].forEach((item: string) => {
        this.tutorialList.push(item)
      })
    });

    setTimeout(() => {

      if (this.tutorialList.length > 0) {

        this.tutorialList.forEach((tutId: string) => {
          let lenOverall: number;
          this.db.doc(`feed/${userid}/${tutId}/visited`).get().subscribe((res:any) => {

            let ipSections: string[] = [];
            this.db.doc(`feed/${userid}`).get().subscribe((result:any) => {
              const { [tutId]: leng } = result.data();
              lenOverall = leng

              for (let key in res.data()) {
                let value = res.data()[key];
                ipSections.push(value);
              }
              if (ipSections.length == lenOverall) {
                if (!this.completedFeed.includes(tutId)) {
                  this.completedFeed.push(tutId);
                  this.inprogressFeed.splice(this.inprogressFeed.findIndex((tutorialid) => tutorialid === tutId),1);
                }
              } else {
                if (!this.inprogressFeed.includes(tutId) && !this.completedFeed.includes(tutId)) {
                  this.inprogressFeed.push(tutId);
                }
              }
            })



          })
        })
      } else {
        console.log("No values");

      }
    },300)
    console.log(this.inprogressFeed);
    console.log(this.completedFeed);


  }


  addSectionCompletion(userId:string,tutorialId:string,sectionId:string) {
    const auth = getAuth();
    let totSections: number;
    let randomId = this.db.createId()
    const userid = JSON.parse(localStorage.getItem("user")!).uid;
    if (userid == userId) {
      this.db.collection("feed").doc(auth.currentUser!.uid).collection(tutorialId).doc("visited").set({
        [randomId] : sectionId
      },{merge: true});
      let totalSections$: Observable<Section[]>;
      totalSections$ = this.store.pipe(select(selectSections(tutorialId)));
      totalSections$.subscribe((res: Section[]) => {
        totSections = res.length;
        this.db.doc(`feed/${auth.currentUser!.uid}`).set({
          visitedTuts: firebase.firestore.FieldValue.arrayUnion(tutorialId),
          [tutorialId]:totSections
        },{merge: true})
      })

    }

  }
  async checkCompletionSections(tutorialId:string) {
    const auth = getAuth();
    let completedSections: string[] = [];
    this.db.doc(`feed/${auth.currentUser!.uid}/${tutorialId}/visited`).get().subscribe((res:any) => {
      for (let key in res.data()) {
        let value = res.data()[key];
        completedSections.push(value);
      }
    })

    return completedSections;
  }
}
