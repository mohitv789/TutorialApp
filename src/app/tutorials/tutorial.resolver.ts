import { TutorialsHttpService } from './services/tutorials-http.service';
import { loadAllTutorials } from './tutorials.actions';
import { areTutorialsLoaded, selectTutorialById } from './tutorials.selectors';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AppState} from '../reducers';
import {select, Store} from '@ngrx/store';
import {filter, finalize, first, tap} from 'rxjs/operators';


@Injectable()
export class TutorialResolver implements Resolve<any> {

    loading = false;

    constructor(private http:TutorialsHttpService) {

    }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot,): Observable<any> {
        const tutorialId = route.paramMap.get("tutorialID");
        return this.http.findTutorialById(tutorialId!);


    }

}
