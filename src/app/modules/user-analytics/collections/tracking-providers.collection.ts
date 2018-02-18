import {BaseCollection} from '../../backbone/collections/base.collection';
import {TrackingProviderModel} from '../models/tracking-provider.model';

export class TrackingProviders<TModel extends TrackingProviderModel> extends BaseCollection<TModel> {
  _userId: string;
  model: any = TrackingProviderModel;

  trackEvent(eventName: string, eventAction: string, msg?: string) {
    const args = arguments;
    this.each(function (trackingProvider) {
      trackingProvider.trackEvent.apply(this, args);
    });
  }

  trackPage(page: string) {
    const args = arguments;
    this.each(function (trackingProvider) {
      trackingProvider.trackPage.apply(this, args);
    });
  }

  setUserId(userId: string) {
    this._userId = userId;
    this.each(function (trackingProvider) {
      trackingProvider.setUserId.call(this, this._userId);
    }, this);
  }

  setProperty(property: string, value: any) {
    if (property && value) {
      this.each(function (trackingProvider) {
        trackingProvider.setProperty.call(this, property, value);
      }, this);
    }
  }

  initialize() {
    this.on('add', function () {
      if (this._userId) {
        this.setUserId(this._userId);
      }
    }, this);
  }

}
