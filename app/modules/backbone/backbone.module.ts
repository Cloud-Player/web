import {NgModule}      from '@angular/core';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';

import {isUndefined} from 'underscore';
import 'backbone';
import {Model} from 'backbone';

declare namespace Backbone {
    export function sync(method: string, model: Model, options?: any): any;

    export function ajax(options?: JQueryAjaxSettings): any;
}

@NgModule({
    imports: [BrowserModule],
    exports: [],
    declarations: [],
})
export class BackboneModule {
    constructor(private http: Http) {
        Backbone.ajax = (options: JQueryAjaxSettings) => {
            let requestOption = new RequestOptions({
                method: options.type,
                body: options.data,
                headers: new Headers(options.headers),
                url: options.url
            });
            return http.request(options.url, new RequestOptions(requestOption))
                .toPromise()
                .then(function (resp: Response) {
                    if (options.success && typeof options.success === 'function') {
                        options.success(resp.json(), resp.statusText, this);
                    }
                    return resp;
                }, function (resp: Response) {
                    if (options.error && typeof options.error === 'function') {
                        options.error(this, resp.statusText, resp.toString());
                    }
                    return new Promise((resolve, reject) => {
                        reject(resp);
                    });
                });
        };

        const superSync = Backbone.sync;
        Backbone.sync = (method: string, model: Model, options?: any) => {
            // we have to set the flag to wait true otherwise all cases were you want to delete mutliple entries will break
            // https://github.com/jashkenas/backbone/issues/3534
            // This flag means that the server has to confirm the creation/deletion before the model will be added/removed to the
            // collection
            options = options || {};
            if (isUndefined(options.wait)) {
                options.wait = true;
            }
            // Instead of the response object we are returning the backbone model in the promise
            return superSync.call(Backbone, method, model, options).then(function () {
                return model;
            });
        };
    }
}

