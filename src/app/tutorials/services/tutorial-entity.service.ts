import { Tutorial } from './../models/Tutorial';
import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';


@Injectable()
export class TutorialEntityService
    extends EntityCollectionServiceBase<Tutorial> {

    constructor(
        serviceElementsFactory:
            EntityCollectionServiceElementsFactory) {

        super('Tutorial', serviceElementsFactory);

    }

}

