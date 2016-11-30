import {Model} from 'backbone';
import {Injectable} from '@angular/core';
import {URLSearchParams} from '@angular/http';

@Injectable()
export class BaseModel extends Model {
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
