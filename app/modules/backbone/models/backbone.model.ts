import {Model} from 'backbone';

export class BaseModel extends Model {
    parse(rsp: any) {
        return rsp.data || rsp;
    };
}
