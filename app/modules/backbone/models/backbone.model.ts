import {Model} from 'backbone';
import {Injectable} from "@angular/core";

@Injectable()
export class BaseModel extends Model {
    parse(rsp: any) {
        return rsp.data || rsp;
    };
}
