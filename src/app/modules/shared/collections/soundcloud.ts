import {Injectable} from '@angular/core';
import {Globals} from '../../../../globals';
import {BaseCollection} from '../../backbone/collections/base.collection';
import {SoundcloudModel} from '../models/soundcloud';
import {getSession} from '../../session/session-manager.fn';

export class SoundcloudCollection<TModel extends SoundcloudModel> extends BaseCollection<TModel> {
  model: any = SoundcloudModel;

  hostName(): string {
    return 'https://api.soundcloud.com';
  }

  sync(method: string, model: any, options: any = {}) {
    this.queryParams['client_id'] = Globals.soundcloudClientId;
    const session = getSession();
    if (session && session.isValid()) {
      this.queryParams['oauth_token'] = session.accessToken;
    }
    return super.sync(method, model, options);
  }

  parse(rsp: any) {
    return rsp.data || rsp;
  }
}


