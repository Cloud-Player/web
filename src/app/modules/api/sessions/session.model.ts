import {AuxappModel} from '../auxapp/auxapp.model';
import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';

export class SessionModel extends AuxappModel {
  endpoint = 'session';

  @attributesKey('browser')
  browser: string;

  @attributesKey('system')
  system: string;

  @attributesKey('screen')
  screen: string;

  @attributesKey('state')
  state: string;

  compose(attrs) {
    if (this.isNew()) {
      return attrs;
    } else {
      return {
        state: attrs.state
      };
    }
  }
}
