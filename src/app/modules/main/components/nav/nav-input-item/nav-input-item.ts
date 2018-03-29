import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-nav-input-item',
  styleUrls: ['./nav-input-item.scss'],
  templateUrl: './nav-input-item.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NavInputItemComponent),
      multi: true
    }
  ]
})

export class NavInputItemComponent implements ControlValueAccessor {
  private _onChange: Function;
  private _onTouch: Function;

  @Input()
  public title: string;

  @Input()
  public link: string;

  @Input()
  public icon: string;

  @Input()
  public image: string;

  @Output()
  public submit: EventEmitter<any>;

  public inputIsVisible = false;
  public tmpValue: any;

  constructor() {
    this.submit = new EventEmitter();
  }

  private updateValue() {
    if (this._onChange) {
      this._onChange(this.tmpValue);
    }
  }

  public showInput() {
    this.inputIsVisible = true;
    //this.input.nativeElement.focus();
  }

  hideInput() {
    this.inputIsVisible = false;
  }

  writeValue(value: any): void {
    this.tmpValue = value;
    this.updateValue();
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouch = fn;
  }
}
