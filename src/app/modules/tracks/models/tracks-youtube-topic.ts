import {YoutubeModel} from '../../shared/models/youtube';
import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {defaultValue} from '../../backbone/decorators/default-value.decorator';

export class TracksYoutubeTopic extends YoutubeModel {
  @attributesKey('title')
  title: string;

  @attributesKey('isParent')
  @defaultValue(false)
  isParent: boolean;
}
