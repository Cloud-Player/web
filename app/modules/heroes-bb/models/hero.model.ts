import {BaseModel} from '../../backbone/models/backbone.model';

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
