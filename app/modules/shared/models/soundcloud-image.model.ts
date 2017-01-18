import {Injectable} from '@angular/core';
import {BaseModel} from '../../backbone/models/base.model';

@Injectable()
export class SoundcloudImageModel extends BaseModel {
  getImageByFormat(format: string) {
    if (this.get('id')) {
      return this.get('id').replace('-large', `-${format}`);
    }
  };

  getLargeSize() {
    return this.getImageByFormat('t500x500');
  };

  getSmallSize() {
    return this.getImageByFormat('small');
  };

  getDefaultSize() {
    return this.get('id');
  };
}
