import {Injectable} from '@angular/core';
import {Globals} from '../../../../globals';
import {BaseCollection} from '../../backbone/collections/base.collection';
import {SoundcloudModel} from '../models/soundcloud.model';
import {getSession} from '../session-manager.fn';

export class SoundcloudCollection<TModel extends SoundcloudModel> extends BaseCollection<TModel> {
  clientId = Globals.soundcloudClientId;

  model: any = SoundcloudModel;

  hostName(): string {
    return 'https://api.soundcloud.com';
  }

  sync(method: string, model: any, options: any = {}) {
    this.queryParams['client_id'] = this.clientId;
    const session = getSession();
    if (session && session.isValid()) {
      this.queryParams['oauth_token'] = session.get('access_token');
    }
    return super.sync(method, model, options);
  }

  parse(rsp: any) {
    return rsp.data || rsp;
  }
}


