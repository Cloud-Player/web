import {BaseModel} from '../../backbone/models/base.model';
import {ImageSizes} from '../src/image-sizes.enum';

export abstract class ImageModel extends BaseModel {
  public abstract getLargeSizeUrl(): string;

  public abstract getMediumSizeUrl(): string;

  public abstract getSmallSizeUrl(): string;

  public abstract getDefaultSizeUrl(): string;

  public getImageBySize(size: ImageSizes) {
    switch (size) {
      case ImageSizes.Large:
        return this.getLargeSizeUrl();
      case ImageSizes.Medium:
        return this.getMediumSizeUrl();
      case ImageSizes.Small:
        return this.getSmallSizeUrl();
      default:
        return this.getDefaultSizeUrl();
    }
  }
}
