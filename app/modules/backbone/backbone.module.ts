import {NgModule}      from '@angular/core';
import {Http, RequestOptions, Headers, Response, URLSearchParams} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {isUndefined} from 'underscore';
import 'backbone';
import {Model, Collection} from 'backbone';
import {BaseModel} from './models/base.model';
import {BaseCollection} from './collections/base.collection';
import {CollectionSearchComponent} from './components/collection-search/collection-search.component';

declare namespace Backbone {
  export function sync(method: string, model: Model|Collection<Model>, options?: any): any;

  export function ajax(options?: JQueryAjaxSettings): any;
}

@NgModule({
  imports: [BrowserModule],
  exports: [
    CollectionSearchComponent
  ],
  providers: [
    BaseCollection,
    BaseModel
  ],
  declarations: [
    CollectionSearchComponent
  ],
})

export class BackboneModule {
  constructor(private http: Http) {
    Backbone.ajax = (options: any) => {
      let searchParams = options.search || new URLSearchParams();
      let requestOption = new RequestOptions({
        method: options.type,
        body: options.data,
        headers: new Headers(options.headers),
        search: searchParams,
        url: options.url
      });
      requestOption.headers.append('content-type', 'application/json');
      return http.request(options.url, requestOption)
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
    Backbone.sync = (method: string, model: Model|Collection<Model>, options?: any) => {
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
