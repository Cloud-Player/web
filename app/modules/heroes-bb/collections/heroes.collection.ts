import {BaseCollection} from '../../backbone/collections/backbone.collection';
import {HeroModel} from '../models/hero.model';

export class HeroesCollection extends BaseCollection<HeroModel> {
    model = HeroModel;

    url = 'app/heroes';
}


