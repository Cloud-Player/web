import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {defaultValue} from '../../backbone/decorators/default-value.decorator';
import {AuxappModel} from '../../api/auxapp/auxapp.model';

export class ConnectDeviceModel extends AuxappModel {
  endpoint = '/token';

  @attributesKey('id')
  tokenId: string;

  @attributesKey('claimed')
  @defaultValue(true)
  claimed: string;
}
