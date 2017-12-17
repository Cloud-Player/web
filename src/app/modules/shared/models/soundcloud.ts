import {Globals} from '../../../../globals';
import {BaseModel} from '../../backbone/models/base.model';
import {getSession} from '../../session/session-manager.fn';

export class SoundcloudModel extends BaseModel {
  hostName(): string {
    return 'https://api.soundcloud.com';
  }

  public sync(method: string, model: any, options: any = {}) {
    debugger;
    this.queryParams['client_id'] = Globals.soundcloudClientId;
    console.log(Globals.soundcloudClientId)
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
