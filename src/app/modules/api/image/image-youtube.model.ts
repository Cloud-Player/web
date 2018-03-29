import {AbstractImageModel} from './abstract-image';
import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {defaultValue} from '../../backbone/decorators/default-value.decorator';

export interface ImageYoutubeImageProperties {
  height: number;
  url: string;
  width: number;
}

export class ImageYoutubeModel extends AbstractImageModel {

  @attributesKey('default')
  @defaultValue({})
  default: ImageYoutubeImageProperties;

  @attributesKey('medium')
  @defaultValue({})
  medium: ImageYoutubeImageProperties;

  @attributesKey('high')
  @defaultValue({})
  high: ImageYoutubeImageProperties;

  getLargeSizeUrl(): string {
    return this.high.url;
  }

  getMediumSizeUrl(): string {
    return this.medium.url;
  }

  getSmallSizeUrl(): string {
    return this.default.url;
  }

  getDefaultSizeUrl(): string {
    return this.default.url;
  }
}
