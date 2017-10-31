import {Injectable} from '@angular/core';
import {Globals} from '../../../../globals';
import {BaseModel} from '../../backbone/models/base.model';
import {getSession} from '../session-manager.fn';

export class SoundcloudModel extends BaseModel {
  clientId = Globals.soundcloudClientId;

  hostName(): string {
    return '//api.soundcloud.com';
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
