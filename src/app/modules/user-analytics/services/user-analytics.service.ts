import {Injectable} from '@angular/core';
import {TrackingProviderModel} from '../models/tracking-provider.model';
import {TrackingProviders} from '../collections/tracking-providers.collection';

@Injectable()
export class UserAnalyticsService {
  private _trackingProviders: TrackingProviders<TrackingProviderModel> = new TrackingProviders();
  private _isActive = false;
  private _trackPageQueue: Array<string> = [];
  private _trackEventQueue: Array<{ eventName: string, eventAction: string, msg?: string }> = [];

  private flushQueues() {
    this._trackPageQueue.forEach((page) => {
      this.trackPage(page);
    });
    this._trackPageQueue = [];

    this._trackEventQueue.forEach((event) => {
      this.trackEvent(event.eventName, event.eventAction, event.msg);
    });
    this._trackEventQueue = [];
  }

  public addProvider(provider: TrackingProviderModel): void {
    this._trackingProviders.add(provider);
  }

  public trackEvent(eventName: string, eventAction: string, msg?: string) {
    if (this._isActive) {
      this._trackingProviders.trackEvent(eventName, eventAction, msg);
    } else {
      this._trackEventQueue.push({
        eventName: eventName,
        eventAction: eventAction,
        msg: msg
      });
    }
  }

  public trackPage(page: string) {
    if (this._isActive) {
      this._trackingProviders.trackPage(page);
    } else {
      this._trackPageQueue.push(page);
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
    if (isActive) {
      this.flushQueues();
    }
  }
}
