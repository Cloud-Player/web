import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OptionsBtnComponent} from '../options-btn/options-btn';

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

  @Output()
  public action: EventEmitter<any>;

  constructor(public el: ElementRef) {
    this.action = new EventEmitter<any>();
  }
}
