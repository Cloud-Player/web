import {Injectable} from '@angular/core';
import {TrackingProviderModel} from '../models/tracking-provider.model';
import {TrackingProviders} from '../collections/tracking-providers.collection';

@Injectable()
export class UserAnalyticsService {
  private _trackingProviders: TrackingProviders<TrackingProviderModel> = new TrackingProviders();
  private _isActive = true;

  public addProvider(provider: TrackingProviderModel): void {
    this._trackingProviders.add(provider);
  }

  public trackEvent(eventName: string, eventAction: string, msg?: string) {
    if (this._isActive) {
      this._trackingProviders.trackEvent(eventName, eventAction, msg);
    }
  }

  public trackPage(page: string) {
    if (this._isActive) {
      this._trackingProviders.trackPage(page);
    }
  }

  public setUserId(userId: string) {
    this._trackingProviders.setUserId(userId);
  }

  public setProperty(property: string, value: any) {
    this._trackingProviders.setProperty(property, value);
  }

  public setActive(isActive: boolean) {
    this._isActive = isActive;
  }
}
