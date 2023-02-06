import { Tutorial } from './../models/Tutorial';
import {Injectable} from '@angular/core';
import {DefaultDataService, HttpUrlGenerator} from '@ngrx/data';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';



@Injectable()
export class TUtorialsDataService extends DefaultDataService<Tutorial> {


    constructor(http:HttpClient, httpUrlGenerator: HttpUrlGenerator) {
        super('Tutorial', http, httpUrlGenerator);

    }

    override getAll(): Observable<Tutorial[]> {
        return this.http.get('/api/tutorials')
            .pipe(
                map((res:any) => res["payload"])
            );
    }

}
