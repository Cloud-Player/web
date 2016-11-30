import {Model, Collection} from 'backbone';
import {BaseModel} from '../models/backbone.model';
import {Injectable} from '@angular/core';
import {URLSearchParams} from '@angular/http';

@Injectable()
export class BaseCollection<TModel extends Model> extends Collection<Model> {
    model = BaseModel;

    queryParams: Object = {};

    parse(rsp: any) {
        return rsp.data || rsp;
    };

    fetch(options: any = {}) {
        let queryParams = new URLSearchParams();
        Object.keys(this.queryParams).forEach((prop) => {
            queryParams.set(prop, this.queryParams[prop]);
        });
        options.search = queryParams;
        return super.fetch(options);
    };
}


