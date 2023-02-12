import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";


@Injectable({
    providedIn: "root"
})
export class UserService {



    pictureUrl$: Observable<string | null>;

    displayName$: Observable<string | null>;

    constructor(
        private afAuth: AngularFireAuth,
        private router: Router) {



        this.pictureUrl$ =
            afAuth.authState.pipe(map(user => user? user.photoURL : null));

        this.displayName$ =
            afAuth.authState.pipe(map(user => user? user.displayName : null));

    }


    }

