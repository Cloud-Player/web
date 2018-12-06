import {SessionModel} from './session.model';
import {AuxappCollection} from '../../auxapp/auxapp.collection';
import {AuxappModel} from '../../auxapp/auxapp.model';

export class SessionsCollection<TModel extends SessionModel> extends AuxappCollection<TModel> {
  private static _instance: SessionsCollection<SessionModel>;

  model: any = SessionModel;

  static getInstance() {
    if (!this._instance) {
      this._instance = new SessionsCollection<SessionModel>();
    }
    return this._instance;
  }

  public getMySession(): SessionModel {
    return this.findWhere({is_mine: true});
  }

  public getPlayerSession(): SessionModel {
    return this.findWhere({is_player: true});
  }

  public setEndpoint(accountId: string) {
    this.endpoint = `account/${accountId}/session`;
  }
}
