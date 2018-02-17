import {BaseModel} from '../../backbone/models/base.model';
import {AbstractImageModel} from '../image/abstract-image';

export interface IArtist extends BaseModel {
  endpoint: string;
  image: AbstractImageModel;
  provider: string;

  //account: IAccount;

  getFullName(): string;

  getAccountId(): string;
}
