import {Component, ElementRef, OnInit} from '@angular/core';
import {UserAnalyticsService} from '../../../user-analytics/services/user-analytics.service';
import * as localforage from 'localforage';

@Component({
  selector: 'app-social-share-panel',
  styleUrls: ['./social-share-panel.style.scss'],
  templateUrl: './social-share-panel.template.html'
})

export class SocialSharePanelComponent implements OnInit {
  constructor(private el: ElementRef, private userAnalyticsService: UserAnalyticsService) {
  }

  public followed(type: string) {
    this.dismiss();
    this.userAnalyticsService.trackEvent('follow_on_' + type, 'click', 'app-social-share-panel-component');
    localforage.setItem('followed_cp', type);
  }

  public notShared() {
    this.dismiss();
    this.userAnalyticsService.trackEvent('social_not_shared', 'click', 'app-social-share-panel-component');
    localforage.setItem('followed_cp', 'none');
  }

  public dismiss() {
    this.el.nativeElement.remove();
  }

  ngOnInit(): void {
    this.el.nativeElement.style.display = 'none';
    localforage.getItem('followed_cp').then((value: string) => {
      if (!value) {
        this.el.nativeElement.style.display = 'block';
      }
    });
  }
}
