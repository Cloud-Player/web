import {BaseCollection} from '../../backbone/collections/backbone.collection';
import {HeroModel} from '../models/hero.model';
import {Injectable} from "@angular/core";

@Injectable()
export class HeroesCollection extends BaseCollection<HeroModel> {
    model = HeroModel;

    url = 'app/heroes';
}


