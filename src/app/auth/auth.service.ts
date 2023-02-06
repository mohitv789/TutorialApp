import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "./model/user.model";
import { AngularFireAuth } from "@angular/fire/compat/auth";




@Injectable()
export class AuthService {

    constructor(private http:HttpClient,public afAuth: AngularFireAuth) {

    }


    login(email:string, password:string) {
      return this.afAuth.signInWithEmailAndPassword(email, password);
    }


    signup(email:string, password:string) {
      return this.afAuth.createUserWithEmailAndPassword(email, password)
  }

}
