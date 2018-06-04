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
import {isUndefined} from 'underscore';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Subscription} from 'rxjs';

export interface ITwoRangeSliderValue {
  min: number;
  max: number;
}

@Component({
  selector: 'app-two-range-slider',
  styleUrls: ['./two-range-slider.style.scss'],
  templateUrl: './two-range-slider.template.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TwoRangeSliderComponent),
      multi: true
    }
  ]
})
export class TwoRangeSliderComponent implements OnChanges, ControlValueAccessor, OnDestroy, AfterContentInit {
  private _onChange: Function;
  private _onTouch: Function;
  private _subscriptions: Subscription;

  dragInProgress = false;
  tmpMinValue: number;
  tmpMaxValue: number;
  draggerSize = 14;
  draggerCenterOffset = -1 * ((this.draggerSize / 2) - 2);

  @ViewChild('progressBar')
  protected progressBar: ElementRef;

  @ViewChild('progressLine')
  protected progressLine: ElementRef;

  @ViewChild('handleOne')
  protected handleOne: ElementRef;

  @ViewChild('handleTwo')
  protected handleTwo: ElementRef;

  @ViewChild('sliderOne')
  protected sliderOne: ElementRef;

  @ViewChild('sliderTwo')
  protected sliderTwo: ElementRef;

  @Input()
  public transformDisplayValue: Function;

  @Input()
  public hideSliderValue: boolean;

  @Input()
  public showSliderValue: boolean;

  @Input()
  public allowInfinityMin: boolean;

  @Input()
  public allowInfinityMax: boolean;

  @Input()
  public value: ITwoRangeSliderValue;

  @Input()
  public minValue: number;

  @Input()
  public maxValue: number;

  @Input()
  public max: number;

  @Input()
  public min: number;

  @Input()
  public step = 1;

  @Input()
  public isLoading: boolean;

  @Output()
  public minValueChange = new EventEmitter();

  @Output()
  public minValueChanged = new EventEmitter();

  @Output()
  public maxValueChange = new EventEmitter();

  @Output()
  public maxValueChanged = new EventEmitter();

  constructor(private el: ElementRef, private renderer2: Renderer2) {
    this.value = this.value || {
      min: null,
      max: null
    };
    this._subscriptions = new Subscription();
  }

  private getValueInMinRange(value: number) {
    if (!isUndefined(this.min) && (!value || value < this.min)) {
      value = this.min;
    }
    return value;
  }

  private getValueInMaxRange(value: number) {
    if (!isUndefined(this.max) && (!value || value > this.max)) {
      value = this.max;
    }
    return value;
  }

  private getValueInMinMaxRange(value: ITwoRangeSliderValue) {
    value.min = this.getValueInMinRange(value.min);
    value.max = this.getValueInMinRange(value.max);
    return value;
  }

  private isInfinityMin(value: number) {
    return (this.allowInfinityMin && (!value || value <= this.min));
  }

  private isInfinityMax(value: number) {
    return (this.allowInfinityMin && (!value || value >= this.max));
  }

  private updateValue(value: ITwoRangeSliderValue) {
    if (this.isInfinityMin(value.min)) {
      value.min = undefined;
    } else if (isUndefined(value.min)) {
      value.min = this.getValueInMinRange(value.min);
    }

    if (this.isInfinityMax(value.max)) {
      value.max = undefined;
    } else if (isUndefined(value.max)) {
      value.max = this.getValueInMaxRange(value.max);
    }

    this.value = value;
    if (!this.dragInProgress) {
      this.tmpMinValue = value.min || this.getValueInMinRange(value.min);
      this.tmpMaxValue = value.max || this.getValueInMaxRange(value.max);
    }

    this.sliderOne.nativeElement.value = this.tmpMinValue;
    this.sliderTwo.nativeElement.value = this.tmpMaxValue;

    if (this._onChange) {
      this._onChange(this.value);
    }
  }

  private setDragPosFromVal() {
    const minVal = this.tmpMinValue;
    const posMin = (((minVal - this.min) / (this.max - this.min)) * 100);

    const maxVal = this.tmpMaxValue;
    const posMax = (((maxVal - this.min) / (this.max - this.min)) * 100);

    this.handleOne.nativeElement.style.left = posMin + '%';
    this.handleOne.nativeElement.style.transform = 'translateX(-' + ((this.draggerSize / 100) * posMin) + 'px)';

    this.handleTwo.nativeElement.style.left = posMax + '%';
    this.handleTwo.nativeElement.style.transform = 'translateX(-' + ((this.draggerSize / 100) * posMax) + 'px)';

    this.progressLine.nativeElement.style.left = posMin + '%';
    this.progressLine.nativeElement.style.width = (posMax - posMin) + '%';
  }

  private dragStart(): void {
    this.dragInProgress = true;

    if (this._onTouch) {
      this._onTouch();
    }
  }

  private dragEnd(): void {
    const value: ITwoRangeSliderValue = {
      min: this.tmpMinValue,
      max: this.tmpMaxValue
    };

    this.updateValue(value);
    this.dragInProgress = false;

    this.minValueChanged.emit(this.value.min);
    this.maxValueChanged.emit(this.value.max);
  }

  getDisplayValue(value: number) {
    if (value && typeof this.transformDisplayValue === 'function') {
      return this.transformDisplayValue(value);
    } else {
      return value;
    }
  }

  getMinSliderDisplayValue() {
    const value = this.tmpMinValue;

    if (this.isInfinityMin(value)) {
      return 'None';
    } else {
      return this.getDisplayValue(value);
    }
  }

  getMaxSliderDisplayValue() {
    const value = this.tmpMaxValue;

    if (this.isInfinityMax(value)) {
      return 'None';
    } else {
      return this.getDisplayValue(value);
    }
  }

  updateMinValue() {
    this.setDragPosFromVal();
    if (this.isInfinityMin(this.tmpMinValue)) {
      this.minValueChange.emit(null);
    } else {
      this.minValueChange.emit(this.tmpMinValue);
    }
  }

  updateMaxValue() {
    this.setDragPosFromVal();
    if (this.isInfinityMax(this.tmpMaxValue)) {
      this.maxValueChange.emit(null);
    } else {
      this.maxValueChange.emit(this.tmpMaxValue);
    }
  }

  writeValue(value: ITwoRangeSliderValue): void {
    if (value) {
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
    if (!this.isInfinityMin(this.value.min)) {
      this.value.min = this.getValueInMinRange(this.value.min);
    }

    if (!this.isInfinityMax(this.value.max)) {
      this.value.max = this.getValueInMaxRange(this.value.max);
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
