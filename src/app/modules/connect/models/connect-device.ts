import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {defaultValue} from '../../backbone/decorators/default-value.decorator';
import {CloudplayerModel} from '../../api/cloud-player/cloud-player.model';

export class ConnectDeviceModel extends CloudplayerModel {
  endpoint = '/token';

  @attributesKey('id')
  tokenId: string;

  @attributesKey('claimed')
  @defaultValue(true)
  claimed: string;
}
