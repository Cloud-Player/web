import {Globals} from '../../../../globals';
import {BaseModel} from '../../backbone/models/base.model';
import {getSession} from '../../session/session-manager.fn';

export class YoutubeModel extends BaseModel {

  hostName(): string {
    return 'https://www.googleapis.com/youtube/v3';
  }

  public sync(method: string, model: any, options: any = {}) {
    this.queryParams['key'] = Globals.youtubeClientId;
    // const session = getSession();
    // if (session && session.isValid()) {
    //   this.queryParams['oauth_token'] = session.accessToken;
    // }
    return super.sync(method, model, options);
  }

  parse(rsp: any) {
    return rsp.data || rsp;
  }
}
