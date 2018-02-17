import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ContextMenuComponent} from '../../context-menu/context-menu';

@Component({
  selector: 'app-options-option-btn',
  styleUrls: ['./options-option-btn.scss'],
  templateUrl: './options-option-btn.html'
})
export class OptionsOptionBtnComponent implements OnInit {

  @Input()
  public title: string;

  @Input()
  public icon: string;

  @Output()
  public action: EventEmitter<any>;

  constructor(public el: ElementRef,
              private contextMenuComponent?: ContextMenuComponent) {
    this.action = new EventEmitter<any>();
  }

  ngOnInit() {
    if (this.contextMenuComponent) {
      this.contextMenuComponent.registerOption({
        title: this.title,
        action: this.action
      });
    }
  }
}
