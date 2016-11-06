import {Collection} from 'backbone';
import {HeroModel} from '../models/hero.model';

export class HeroesCollection extends Collection<HeroModel> {
    model = HeroModel;

    url = 'app/heroes';

    parse(rsp:any) {
        return rsp.data || rsp;
    }
}


