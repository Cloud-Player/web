import {BaseModel} from '../../backbone/models/base.model';
import {ComponentRef} from '@angular/core';
import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {IPlayer} from '../src/player.interface';

export class PlayerStoreItem extends BaseModel {
  @attributesKey('component')
  component: ComponentRef<IPlayer>;

  @attributesKey('provider')
  provider: string;
}
