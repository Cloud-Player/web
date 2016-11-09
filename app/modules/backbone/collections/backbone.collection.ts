import {Collection} from 'backbone';
import {BaseModel} from '../models/backbone.model';
import {Injectable} from "@angular/core";

@Injectable()
export class BaseCollection<T extends BaseModel> extends Collection<BaseModel> {
    model = BaseModel;

    queryParams: Object = {};

    parse(rsp: any) {
        return rsp.data || rsp;
    }
}


