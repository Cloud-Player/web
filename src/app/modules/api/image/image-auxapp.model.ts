import {AbstractImageModel} from './abstract-image';
import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';

export class ImageAuxappModel extends AbstractImageModel {

  @attributesKey('large')
  large: string;

  @attributesKey('medium')
  medium: string;

  @attributesKey('small')
  small: string;

  getLargeSizeUrl(): string {
    return this.large;
  }

  getMediumSizeUrl(): string {
    return this.medium;
  }

  getSmallSizeUrl(): string {
    return this.small;
  }

  getDefaultSizeUrl(): string {
    return this.medium;
  }
}
