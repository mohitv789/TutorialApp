import {Injectable} from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { getAuth, updateProfile , signOut } from "firebase/auth";
import { Router } from "@angular/router";


@Injectable()
export class AuthService {

    constructor(private router:Router,public afAuth: AngularFireAuth) {

    }


    login(email:string, password:string) {
      return this.afAuth.signInWithEmailAndPassword(email, password);
    }


    signup(email:string, password:string) {
      return this.afAuth.createUserWithEmailAndPassword(email, password)
    }

    signout() {
      const auth = getAuth();
      signOut(auth);
    }

    updateProfile(dName: string, profilePhoto: string) {
      const auth = getAuth();
      return updateProfile(auth.currentUser!, {
        displayName: dName,
        photoURL: profilePhoto
      }).then((result) => {
        console.log(result);
      }).catch((error) => {
        console.log(error);
      });
    }

}
