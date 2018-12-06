import {Component, ElementRef, EventEmitter, Input, Output} from '@angular/core';
import {UserAnalyticsService} from '../../../user-analytics/services/user-analytics.service';

@Component({
  selector: 'app-option-btn',
  styleUrls: ['./option-btn.scss'],
  templateUrl: './option-btn.html'
})
export class OptionBtnComponent {

  @Input()
  public title: string;

  @Input()
  public icon: string;

  @Input()
  public executeAction = true;

  @Input()
  public isActive = false;

  @Output()
  public action: EventEmitter<any>;

  constructor(public el: ElementRef, private userAnalyticsService: UserAnalyticsService) {
    this.action = new EventEmitter<any>();
  }

  public execute() {
    if (this.executeAction) {
      this.action.emit();
      this.userAnalyticsService.trackEvent('option_btn', `click_${this.title}`, 'app-option-btn');
    }
  }
}
