import { Section } from './../models/Section';
import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';


@Injectable()
export class SectionEntityService extends EntityCollectionServiceBase<Section> {

    constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super("Section", serviceElementsFactory);
    }

}
