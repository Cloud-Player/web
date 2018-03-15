import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Optional, Output} from '@angular/core';
import {ContextMenuComponent} from '../../context-menu/context-menu';
import {uniqueId} from 'underscore';

@Component({
  selector: 'app-options-option-btn',
  styleUrls: ['./options-option-btn.scss'],
  templateUrl: './options-option-btn.html'
})
export class OptionsOptionBtnComponent implements OnInit, OnDestroy {
  private _id: string;
  @Input()
  public title: string;

  @Input()
  public icon: string;

  @Output()
  public action: EventEmitter<any>;

  constructor(public el: ElementRef,
              @Optional() private contextMenuComponent: ContextMenuComponent) {
    this.action = new EventEmitter<any>();
    this._id = uniqueId('options_opt');
  }

  ngOnInit() {
    if (this.contextMenuComponent) {
      this.contextMenuComponent.registerOption({
        id: this._id,
        title: this.title,
        action: this.action,
        icon: this.icon
      });
    }
  }

  ngOnDestroy() {
    if (this.contextMenuComponent) {
      this.contextMenuComponent.unRegisterOption(this._id);
    }
  }
}
