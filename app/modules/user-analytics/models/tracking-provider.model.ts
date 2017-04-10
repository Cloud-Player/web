import {BaseModel} from '../../backbone/models/base.model';
import {Injectable} from '@angular/core';

@Injectable()
export class TrackingProviderModel extends BaseModel {
  trackEvent(eventName:string, eventAction: string, msg: string): void {

  }

  trackPage(page: string): void {

  }

  setUserId(userId: string): void {

  }

  setProperty(property: string, value: any): void {

  }
}
