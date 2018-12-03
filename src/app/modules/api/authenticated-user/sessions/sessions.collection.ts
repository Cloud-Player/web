import {AuxappCollection} from '../auxapp/auxapp.collection';
import {AuxappModel} from '../auxapp/auxapp.model';
import {SessionModel} from './session.model';

export class SessionsCollection<TModel extends SessionModel> extends AuxappCollection<AuxappModel> {
  private static _instance: SessionsCollection<SessionModel>;

  model: any = SessionModel;

  static getInstance() {
    if (!this._instance) {
      this._instance = new SessionsCollection<SessionModel>();
    }
    return this._instance;
  }

  public getMySession(): TModel {
    return <TModel>this.findWhere({is_mine: true});
  }
}
