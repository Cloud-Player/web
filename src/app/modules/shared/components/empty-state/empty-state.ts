import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {UserAnalyticsService} from '../../../user-analytics/services/user-analytics.service';

@Component({
  selector: 'app-empty-state',
  styleUrls: ['./empty-state.scss'],
  templateUrl: './empty-state.html'
})
export class EmptyStateComponent implements OnInit, OnDestroy {

  @Input()
  public title: string;

  @Input()
  public icon: string;

  @Input()
  public ctaText: string;

  @Input()
  public ctaIcon: string;

  @Input()
  public ctaLink: string;

  @Output()
  public ctaClick: EventEmitter<any>;

  constructor(private router: Router, private userAnalyticsService: UserAnalyticsService) {
    this.ctaClick = new EventEmitter<any>();
  }

  public click() {
    if (this.ctaLink) {
      this.router.navigateByUrl(this.ctaLink);
    }
    this.ctaClick.emit();
    this.userAnalyticsService.trackEvent(
      'empty_state',
      `cta_click_${this.ctaText}`,
      'app-empty-state');
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
  }
}
