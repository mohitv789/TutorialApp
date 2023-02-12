import { loadAllTutorials } from './tutorials.actions';
import { areTutorialsLoaded } from './tutorials.selectors';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AppState} from '../reducers';
import {select, Store} from '@ngrx/store';
import {filter, finalize, first, tap} from 'rxjs/operators';


@Injectable()
export class TutorialsResolver implements Resolve<any> {

    loading = false;

    constructor(private store: Store<AppState>,private router: Router) {

    }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<any> {

        return this.store
            .pipe(
                select(areTutorialsLoaded),
                tap(tutorialsLoaded => {
                    if (!this.loading && !tutorialsLoaded) {
                        this.loading = true;
                        this.store.dispatch(loadAllTutorials());
                    }
                }),
                filter(tutorialsLoaded => tutorialsLoaded),
                first(),
                finalize(() => this.loading = false)
            );

    }

}
