import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AppState} from '../reducers';
import {select, Store} from '@ngrx/store';
import {filter, finalize, first, tap} from 'rxjs/operators';
import { selectSections, selectSectionsLoading } from './sections.selector';
import { SectionsRequested } from './section.actions';


@Injectable()
export class SectionsResolver implements Resolve<any> {

    loading = false;

    constructor(private store: Store<AppState>) {

    }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<any> {
    const tutorialId = route.paramMap.get("tutorialID");

        return this.store
            .pipe(
              select(selectSectionsLoading),
                tap(sectionsLoaded => {
                    if (!this.loading && !sectionsLoaded && tutorialId) {
                        this.loading = true;
                        this.store.dispatch(new SectionsRequested({tutorialId}));
                    }
                }),
                first(),
                finalize(() => this.loading = false)
            );

    }

}
