import {Injectable} from '@angular/core';
import {BaseModel} from '../../backbone/models/base.model';

export class SoundcloudImageModel extends BaseModel {
  getImageByFormat(format: string): string {
    if (this.id) {
      return this.id.replace('-large', `-${format}`);
    }
  }

  getLargeSize(): string {
    return this.getImageByFormat('t500x500');
  }

  getMediumSize(): string {
    return this.getImageByFormat('badge');
  }

  getSmallSize(): string {
    return this.getImageByFormat('small');
  }

  getDefaultSize(): string {
    return this.id;
  }
}
