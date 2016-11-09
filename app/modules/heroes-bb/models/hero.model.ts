import {BaseModel} from '../../backbone/models/backbone.model';
import {Injectable} from "@angular/core";

@Injectable()
export class HeroModel extends BaseModel {
    urlRoot = 'app/heroes';

    getFullName() {
        return `${this.get('name')}`;
    };

    validate(attrs: any) {
        if (!attrs.name || attrs.name.length < 1) {
            return "name is required";
        }
    }
}
