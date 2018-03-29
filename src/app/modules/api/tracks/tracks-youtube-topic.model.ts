import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {defaultValue} from '../../backbone/decorators/default-value.decorator';
import {BaseModel} from '../../backbone/models/base.model';

export class TracksYoutubeTopicModel extends BaseModel {
  @attributesKey('title')
  title: string;

  @attributesKey('isParent')
  @defaultValue(false)
  isParent: boolean;
}
