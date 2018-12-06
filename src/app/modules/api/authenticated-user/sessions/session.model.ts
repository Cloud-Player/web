import {AuxappModel} from '../../auxapp/auxapp.model';
import {attributesKey} from '../../../backbone/decorators/attributes-key.decorator';

export class SessionModel extends AuxappModel {
  endpoint = 'session';

  @attributesKey('browser')
  browser: string;

  @attributesKey('system')
  system: string;

  @attributesKey('account_id')
  account_id: string;

  @attributesKey('screen')
  screen: string;

  @attributesKey('is_mine')
  is_mine: boolean;

  @attributesKey('is_player')
  is_player: boolean;

  compose(attrs) {
    if (this.isNew()) {
      return attrs;
    } else {
      return {
        is_player: attrs.is_player
      };
    }
  }
}
