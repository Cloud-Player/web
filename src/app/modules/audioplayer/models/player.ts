import {BaseModel} from '../../backbone/models/base.model';
import {ComponentRef} from '@angular/core';
import {IPlayer} from '../interfaces/player';
import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';

export class PlayerModel extends BaseModel {
  idAttribute = 'trackId';

  @attributesKey('component')
  component: ComponentRef<IPlayer>;

  @attributesKey('instance')
  instance: IPlayer;

  @attributesKey('id')
  trackId: string;

}
