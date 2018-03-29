import {TrackingProviderModel} from './tracking-provider.model';
import {isString} from 'underscore';

declare global {
  interface Window {
    ga: any;
  }
}

export class GoogleAnalyticsTrackingProvider extends TrackingProviderModel {
  trackEvent(eventName: string, eventAction: string, msg?: string) {
    window.ga('send', 'event', eventName, eventAction, msg);
  }

  trackPage(page: string) {
    window.ga('set', 'page', page);
    window.ga('send', 'pageview');
  }

  setUserId(userId: string) {
    window.ga('set', 'userId', userId);
  }

  setProperty(property: string, value: any) {
    window.ga('set', property, value);
  }

  initialize(GoogleAnalyticsTrackingId: string) {
    this.set('id', 'GA');

    if (!GoogleAnalyticsTrackingId || !isString(GoogleAnalyticsTrackingId)) {
      throw new Error('Please initialize this provider with a valid Google analytics tracking id by passing the id into the constructor!');
    }

    /*
     * This is the code snippet provided by Google Analytics
     * https://developers.google.com/analytics/devguides/collection/analyticsjs/
     */
    (function (i: any, s: any, o: any, g: any, r: any, a?: any, m?: any) {
      i['GoogleAnalyticsObject'] = r;
      i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments);
      }, i[r].l = 1 * <any>new Date();
      a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
      a.async = 1;
      a.src = g;
      m.parentNode.insertBefore(a, m);
    })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

    window.ga('create', GoogleAnalyticsTrackingId, 'auto');
  }
}
