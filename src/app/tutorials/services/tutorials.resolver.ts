import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {TutorialEntityService} from './tutorial-entity.service';
import {filter, first, map, tap} from 'rxjs/operators';


@Injectable()
export class CoursesResolver implements Resolve<boolean> {

    constructor(private tutsService: TutorialEntityService) {

    }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<boolean> {

        return this.tutsService.loaded$
            .pipe(
                tap(loaded => {
                    if (!loaded) {
                       this.tutsService.getAll();
                    }
                }),
                filter(loaded => !!loaded),
                first()
            );

    }

}
