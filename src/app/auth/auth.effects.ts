import { AuthService } from './auth.service';
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AuthActions} from './action-types';
import {concatMap, tap} from 'rxjs/operators';
import {Router} from '@angular/router';


@Injectable()
export class AuthEffects {

    login$ = createEffect(() =>
        this.actions$
            .pipe(
                ofType(AuthActions.login),
                tap(action => localStorage.setItem('user',
                        JSON.stringify(action.user))
                )
            )
    ,
    {dispatch: false});

    logout$ = createEffect(() =>
        this.actions$
            .pipe(
                ofType(AuthActions.logout),
                tap(action => {
                    localStorage.removeItem('user');
                    this.authService.signout();
                    this.router.navigateByUrl('/login');
                })
            )
    , {dispatch: false});

    signup$ = createEffect(() =>
        this.actions$
            .pipe(
                ofType(AuthActions.signup),
                tap(action => {
                  console.log(action);
                  this.router.navigateByUrl('/login');
                })
            )
    ,
    {dispatch: false});

    profileUpdate$ = createEffect(() =>
    this.actions$
        .pipe(
            ofType(AuthActions.updateProfile),
            concatMap(async (action) => this.authService.updateProfile(
                action.dName,
                action.profilePhoto
              ))
        ),
  {dispatch: false});

    constructor(private actions$: Actions,
                private router: Router,
                private authService: AuthService) {

    }

}
