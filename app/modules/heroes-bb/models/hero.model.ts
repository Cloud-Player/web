import {Model} from 'backbone';

export class HeroModel extends Model {
    urlRoot = 'app/heroes';

    parse(rsp: any) {
        return rsp.data || rsp;
    };

    getFullName() {
        return `${this.get('name')}`;
    };

    validate(attrs: any) {
        if (!attrs.name || attrs.name.length < 1) {
            return "name is required";
        }
    }
}
