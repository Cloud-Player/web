import {attributesKey} from '../../backbone/decorators/attributes-key.decorator';
import {AbstractImageModel} from './abstract-image';

export class ImageSoundcloudModel extends AbstractImageModel {

  @attributesKey('id')
  public imageUrl: string;

  private getImageByFormat(format: string): string {
    if (this.imageUrl) {
      return this.imageUrl.replace('-large', `-${format}`);
    }
  }

  public getLargeSizeUrl(): string {
    return this.getImageByFormat('t500x500');
  }

  public getMediumSizeUrl(): string {
    return this.getImageByFormat('t300x300');
  }

  public getSmallSizeUrl(): string {
    return this.getImageByFormat('small');
  }

  public getDefaultSizeUrl(): string {
    return this.imageUrl;
  }

  public toJSON() {
    return {
      id: this.imageUrl
    };
  }
}
