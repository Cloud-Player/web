import {NgModule} from '@angular/core';
import {UserAnalyticsService} from './services/user-analytics.service';
import {GoogleAnalyticsTrackingProvider} from './models/google-analytics-tracking-provider.model';
import {NavigationEnd, Router, ActivatedRoute} from '@angular/router';

@NgModule({
  providers: [UserAnalyticsService]
})

export class UserAnalyticsModule {
  constructor(private userAnalyticsService: UserAnalyticsService, private router: Router, private route: ActivatedRoute) {
    userAnalyticsService.addProvider(new GoogleAnalyticsTrackingProvider('UA-96117674-1'));
    userAnalyticsService.setProperty('anonymizeIp', true);

    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe(() => {
        let currentRoute = this.route.root;
        while (currentRoute.children[0] !== undefined) {
          currentRoute = currentRoute.children[0];
        }
        userAnalyticsService.trackPage(currentRoute.snapshot.routeConfig.path);
      });
  }
}
