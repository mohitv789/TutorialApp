import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { getAuth } from "firebase/auth";
import firebase from 'firebase/compat/app';

@Injectable({
    providedIn: "root"
})
export class UserService {



    pictureUrl$: Observable<string | null>;

    displayName$: Observable<string | null>;

    constructor(
        private afAuth: AngularFireAuth,
        private db: AngularFirestore) {



        this.pictureUrl$ =
            afAuth.authState.pipe(map(user => user? user.photoURL : null));

        this.displayName$ =
            afAuth.authState.pipe(map(user => user? user.displayName : null));

    }

    addSectionCompletion(userId:string,tutorialId:string,sectionId:string) {
      const auth = getAuth();
      if (JSON.parse(localStorage.getItem("user")!).uid == userId) {
        this.db.collection("users").doc(auth.currentUser!.uid).update({
          completedSections: firebase.firestore.FieldValue.arrayUnion({
            tutorialId: tutorialId,
            sectionId: sectionId
          })
        })
      }
    }

    checkCompletionSections(userId:string) {
      const auth = getAuth();
      let completedSections: any[] = [];
      this.db.collection("users").doc(auth.currentUser!.uid).get().subscribe(
        (userProfileDoc:any) => {
          if (!!userProfileDoc.data()["completedSections"]) {
            const lensec = userProfileDoc.data()["completedSections"].length;
            for (let index = 0; index <lensec; index++) {
              completedSections.push(userProfileDoc.data()["completedSections"][index]["sectionId"])
            }
        }
      })
      return completedSections;
    }
}

