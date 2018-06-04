import {
  AfterContentInit,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {isNumber, isUndefined} from 'underscore';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-range-slider',
  styleUrls: ['./range-slider.style.scss'],
  templateUrl: './range-slider.template.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RangeSliderComponent),
      multi: true
    }
  ]
})
export class RangeSliderComponent implements ControlValueAccessor, OnDestroy, OnChanges, AfterContentInit {
  private _onChange: Function;
  private _onTouch: Function;
  private _subscriptions: Subscription;

  dragInProgress = false;
  tmpValue: number;
  draggerSize = 14;
  draggerCenterOffset = -1 * ((this.draggerSize / 2) - 2);

  @ViewChild('progressLine')
  protected progressBarLine: ElementRef;

  @ViewChild('progressBar')
  protected progressBarBg: ElementRef;

  @ViewChild('handle')
  protected handle: ElementRef;

  @Input()
  public transformDisplayValue: Function;

  @Input()
  public hideSliderValue: boolean;

  @Input()
  public showCurrentValue: boolean;

  @Input()
  public showSliderValue: boolean;

  @Input()
  public value;

  @Input()
  public min = 0;

  @Input()
  public max = 100;

  @Input()
  public step = 1;

  @Input()
  public isLoading: boolean;

  @Input()
  public allowInfinity = true;

  @Input()
  public vertical = false;

  @Output()
  public valueChange = new EventEmitter();

  @Output()
  public valueChanged = new EventEmitter();

  constructor(private el: ElementRef, private renderer2: Renderer2) {
    this._subscriptions = new Subscription();
  }

  private getValueInMinMaxRange(value: number) {
    if (!isUndefined(this.min) && (!value || value < this.min)) {
      value = this.min;
    }
    if (!isUndefined(this.max) && value > this.max) {
      value = this.max;
    }
    return value;
  }

  private updateValue(value: number) {
    if (this.isInfinity(value)) {
      value = undefined;
    } else if (isUndefined(value)) {
      value = this.getValueInMinMaxRange(value);
    }

    this.value = value;

    if (!this.dragInProgress) {
      this.tmpValue = value || this.getValueInMinMaxRange(value);
    }

    if (this._onChange) {
      this._onChange(this.value);
    }
  }

  private dragStart(): void {
    this.dragInProgress = true;

    if (this._onTouch) {
      this._onTouch();
    }
  }

  private dragEnd(): void {
    const value = this.tmpValue;

    this.updateValue(value);
    this.dragInProgress = false;
    this.valueChanged.emit(this.value);
  }

  private setDragPosFromVal() {
    const pos = (((this.tmpValue - this.min) / (this.max - this.min)) * 100);
    this.handle.nativeElement.style.left = pos + '%';
    let translateVal = 'translateX(-' + ((this.draggerSize / 100) * pos) + 'px)';
    if (this.vertical) {
      translateVal += ' rotate(90deg)';
    }
    this.handle.nativeElement.style.transform = translateVal;
    this.progressBarLine.nativeElement.style.width = pos + '%';
  }

  protected getDisplayValue(value: number) {
    if (value && typeof this.transformDisplayValue === 'function') {
      return this.transformDisplayValue(value);
    } else {
      return value;
    }
  }

  getSliderDisplayValue(value: number) {
    if (this.isInfinity(value)) {
      return 'None';
    } else {
      return this.getDisplayValue(value);
    }
  }

  update() {
    this.setDragPosFromVal();
    if (this.isInfinity(this.tmpValue)) {
      this.valueChange.emit(null);
    } else {
      this.valueChange.emit(this.tmpValue);
    }
  }

  isInfinity(value: number) {
    return (this.allowInfinity && (!value || value <= this.min));
  }

  writeValue(value: number): void {
    if (isNumber(value)) {
      this.updateValue(value);
      if (!this.dragInProgress) {
        this.setDragPosFromVal();
      }
    }
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouch = fn;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.value) {
      this.updateValue(changes.value.currentValue);
    }

    if (!this.dragInProgress) {
      this.setDragPosFromVal();
    }
  }

  ngAfterContentInit(): void {
    if (!this.isInfinity(this.value)) {
      this.value = this.getValueInMinMaxRange(this.value);
    }

    this.updateValue(this.value);

    this._subscriptions.add(
      this.renderer2.listen(this.el.nativeElement, 'mousedown', this.dragStart.bind(this))
    );
    this._subscriptions.add(
      this.renderer2.listen(this.el.nativeElement, 'touchstart', this.dragStart.bind(this))
    );

    this._subscriptions.add(
      this.renderer2.listen(this.el.nativeElement, 'mouseup', this.dragEnd.bind(this))
    );
    this._subscriptions.add(
      this.renderer2.listen(this.el.nativeElement, 'touchend', this.dragEnd.bind(this))
    );

    this.setDragPosFromVal();
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

}
