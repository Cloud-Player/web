import {NgModule} from '@angular/core';

import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {Collection, Model} from 'backbone';
import {CollectionSortComponent} from './components/collection-sort-component/collection-sort.component';
import {CollectionRangeInputSearchComponent} from './components/collection-range-input-search/collection-range-input-search.component';
import {HttpClient, HttpClientModule, HttpHeaders, HttpResponse} from '@angular/common/http';

declare namespace Backbone {
  export function sync(method: string, model: Model | Collection<Model>, options?: any): any;

  export function ajax(options?: JQueryAjaxSettings): any;
}

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule],
  exports: [
    CollectionSortComponent,
    CollectionRangeInputSearchComponent
  ],
  providers: [],
  declarations: [
    CollectionSortComponent,
    CollectionRangeInputSearchComponent
  ]
})

export class BackboneModule {
  constructor(private http: HttpClient) {
    Backbone.ajax = (options: any) => {
      const requestOption = {
        method: options.type,
        body: options.data,
        headers: new HttpHeaders(options.headers),
        params: options.params,
        url: options.url,
        withCredentials: options.withCredentials
      };
      requestOption.headers.append('content-type', 'application/json');
      return http.request(options.type, options.url, requestOption)
        .toPromise()
        .then(function (resp: any) {
          if (options.success && typeof options.success === 'function') {
            options.success(resp, null, this);
          }
          return resp;
        }, function (resp: HttpResponse<{}>) {
          if (options.error && typeof options.error === 'function') {
            options.error(this, resp.statusText, resp.toString());
          }
          return new Promise((resolve, reject) => {
            reject(resp);
          });
        });
    };

    const superSync = Backbone.sync;
    Backbone.sync = (method: string, model: Model | Collection<Model>, options?: any) => {
      // Instead of the response object we are returning the backbone model in the promise
      return superSync.call(Backbone, method, model, options).then(function () {
        return model;
      });
    };
  }
}
