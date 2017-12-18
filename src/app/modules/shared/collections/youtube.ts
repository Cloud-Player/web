import {Injectable} from '@angular/core';
import {Globals} from '../../../../globals';
import {BaseCollection} from '../../backbone/collections/base.collection';
import {SoundcloudModel} from '../models/soundcloud';
import {getSession} from '../../session/session-manager.fn';
import {YoutubeModel} from '../models/youtube';

export class YoutubeCollection<TModel extends YoutubeModel> extends BaseCollection<TModel> {

  model: any = YoutubeModel;

  hostName(): string {
    return 'https://www.googleapis.com/youtube/v3';
  }

  sync(method: string, model: any, options: any = {}) {
    this.queryParams['key'] = Globals.youtubeClientId;
    // const session = getSession();
    // if (session && session.isValid()) {
    //   this.queryParams['oauth_token'] = session.accessToken;
    // }
    return super.sync(method, model, options);
  }

  parse(rsp: any) {
    return rsp.data.items || rsp;
  }
}


