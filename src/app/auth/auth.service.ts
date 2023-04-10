import {Injectable} from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { getAuth, updateProfile , signOut } from "firebase/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import firebase from 'firebase/compat/app';
@Injectable()
export class AuthService {

    constructor(public afAuth: AngularFireAuth,
      private db: AngularFirestore) {

    }


    login(email:string, password:string) {
      return this.afAuth.signInWithEmailAndPassword(email, password);
    }


    signup(email:string, password:string) {
      return this.afAuth.createUserWithEmailAndPassword(email, password).then((result) => {      

        firebase.firestore().collection('users').doc(result.user?.uid).set({ email: email});
        
      });
    }

    signout() {
      const auth = getAuth();
      signOut(auth);
    }

    updateProfile(displayName: string, profilePhoto: string) {
      const auth = getAuth();
      this.db.collection("users").doc(auth.currentUser!.uid).update({
        displayName: displayName,
        photoURL: profilePhoto
      })
      return updateProfile(auth.currentUser!, {
        displayName: displayName,
        photoURL: profilePhoto
      });
    }

}
