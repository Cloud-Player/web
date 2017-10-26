import {Component, ElementRef, OnInit} from '@angular/core';
import {UserAnalyticsService} from '../../../user-analytics/services/user-analytics.service';
import localforage = require('localforage');

@Component({
  selector: 'social-share-panel',
  styles: [require('./social-share-panel.style.scss')],
  template: require('./social-share-panel.template.html')
})

export class SocialSharePanelComponent implements OnInit {
  constructor(private el: ElementRef, private userAnalyticsService: UserAnalyticsService) {
  }

  public shared(type: string) {
    this.dismiss();
    this.userAnalyticsService.trackEvent('social_shared_on_' + type, 'click', 'social-share-panel-component');
    localforage.setItem('shared_cp', type);
  }

  public notShared() {
    this.dismiss();
    this.userAnalyticsService.trackEvent('social_not_shared', 'click', 'social-share-panel-component');
    localforage.setItem('shared_cp', "none");
  }

  public dismiss() {
    this.el.nativeElement.remove();
  }

  ngOnInit(): void {
    this.el.nativeElement.style.display = 'none';
    localforage.getItem('shared_cp').then((value: string)=>{
      if (!value) {
        this.el.nativeElement.style.display = 'block';
      }
    });
  }
}
