import {Injectable} from '@angular/core';
import {TrackingProviderModel} from '../models/tracking-provider.model';
import {TrackingProviders} from '../collections/tracking-providers.collection';

@Injectable()
export class UserAnalyticsService {
  trackingProviders: TrackingProviders<TrackingProviderModel> = new TrackingProviders();

  addProvider(provider: TrackingProviderModel): void {
    this.trackingProviders.add(provider);
  }

  trackEvent(eventName: string, eventAction: string, msg: string) {
    this.trackingProviders.trackEvent(eventName, eventAction, msg);
  }

  trackPage(page: string) {
    this.trackingProviders.trackPage(page);
  }

  setUserId(userId: string) {
    this.trackingProviders.setUserId(userId);
  }

  setProperty(property: string, value: any) {
    this.trackingProviders.setProperty(property, value);
  }
}
