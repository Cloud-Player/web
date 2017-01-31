import {Component, Input, Output, ViewChild, ElementRef, EventEmitter} from '@angular/core';
import {isNumber} from 'underscore';

@Component({
  selector: 'two-range-slider',
  styles: [require('./two-range-slider.style.scss')],
  template: require('./two-range-slider.template.html')
})

export class TwoRangeSliderComponent {
  private _tmpMinValue: number = 0;
  private _tmpMaxValue: number = 0;
  private _minValue: number = 0;
  private _maxValue: number = 0;
  private _min: number = 0;
  private _max: number = 0;
  private _step: number = 0.1;
  private showLoadingSpinner: boolean = false;
  public dragInProgress: boolean = false;
  public dragHandleMinDisplayValue: number = 0;
  public dragHandleMaxDisplayValue: number = 0;
  private draggerWidth = 0;
  @Output() minValueChange = new EventEmitter();
  @Output() minValueChanged = new EventEmitter();
  @Output() maxValueChange = new EventEmitter();
  @Output() maxValueChanged = new EventEmitter();

  @ViewChild('progressBar') progressBar: ElementRef;
  @ViewChild('progressLine') progressLine: ElementRef;
  @ViewChild('handleOne') handleOne: ElementRef;
  @ViewChild('handleTwo') handleTwo: ElementRef;
  @ViewChild('sliderOne') sliderOne: ElementRef;
  @ViewChild('sliderTwo') sliderTwo: ElementRef;

  get tmpMinValue(): number {
    return this._tmpMinValue;
  }

  set tmpMinValue(val: number) {
    let maxVal = isNumber(this.tmpMaxValue) ? this.tmpMaxValue : this.max;
    if (val >= maxVal) {
      return;
    }

    if (this.allowInfinityMin && val === this.min) {
      val = null;
    }

    this._tmpMinValue = val;
    this.setDragPosFromVal();

    this.dragHandleMinDisplayValue = this.getDisplayValue(val);

    this.minValueChange.emit(val);
  }

  get tmpMaxValue(): number {
    return this._tmpMaxValue;
  }

  set tmpMaxValue(val: number) {
    let minVal = isNumber(this.tmpMinValue) ? this.tmpMinValue : this.min;
    if (val <= minVal) {
      return;
    }

    if (this.allowInfinityMax && val === this.max) {
      val = null;
    }

    this._tmpMaxValue = val;
    this.setDragPosFromVal();

    this.dragHandleMaxDisplayValue = this.getDisplayValue(val);

    this.maxValueChange.emit(val);
  }

  @Input()
  public transformDisplayValue: Function;
  @Input()
  public hideSliderValue: boolean;
  @Input()
  public allowInfinityMin: boolean;
  @Input()
  public allowInfinityMax: boolean;

  @Input()
  get minValue(): number {
    return this._minValue;
  }

  set minValue(val: number) {
    if (!this.dragInProgress) {
      this._minValue = val;
      this.tmpMinValue = val;
    }
  }

  @Input()
  get maxValue(): number {
    return this._maxValue;
  }

  set maxValue(val: number) {
    if (!this.dragInProgress) {
      this._maxValue = val;
      this.tmpMaxValue = val;
    }
  }

  @Input()
  get max(): number {
    return this._max;
  }

  set max(val: number) {
    if (val) {
      this._max = val;
      this.setDragPosFromVal();
    }
  }

  @Input()
  get min(): number {
    return this._min;
  }

  set min(val: number) {
    if (val) {
      this._min = val;
      this.setDragPosFromVal();
    }
  }

  @Input()
  get step(): number {
    return this._step;
  }

  set step(val: number) {
    if (val) {
      this._step = val;
    }
  }

  @Input()
  get isLoading(): boolean {
    return this.showLoadingSpinner;
  }

  set isLoading(val: boolean) {
    this.showLoadingSpinner = val;
  }

  constructor(private el: ElementRef) {
  }

  public getDisplayValue(value: number){
    if(value && typeof this.transformDisplayValue === "function"){
      return this.transformDisplayValue(value);
    } else {
      return value;
    }
  }

  private setDragPosFromVal() {
    let minVal = isNumber(this.tmpMinValue) ? this.tmpMinValue : this.min;
    let posMin = (((minVal - this.min) / (this.max - this.min)) * 100);

    let maxVal = isNumber(this.tmpMaxValue) ? this.tmpMaxValue : this.max;
    let posMax = (((maxVal - this.min) / (this.max - this.min)) * 100);

    this.handleOne.nativeElement.style.left = posMin + '%';
    this.handleOne.nativeElement.style.transform = 'translateX(-' + ((this.draggerWidth / 100) * posMin) + 'px)';

    this.handleTwo.nativeElement.style.left = posMax + '%';
    this.handleTwo.nativeElement.style.transform = 'translateX(-' + ((this.draggerWidth / 100) * posMax) + 'px)';

    this.progressLine.nativeElement.style.left = posMin + '%';
    this.progressLine.nativeElement.style.width = (posMax - posMin) + '%';
  }


  ngAfterContentInit() {
    this.el.nativeElement.addEventListener('mousedown', () => {
      this.dragInProgress = true;
    });

    this.el.nativeElement.addEventListener('mouseup', () => {
      this.dragInProgress = false;
      if (this.minValue !== this.tmpMinValue) {
        this.minValue = this.tmpMinValue;
        this.minValueChanged.emit(this.minValue);
      }

      if (this.maxValue !== this.tmpMaxValue) {
        this.maxValue = this.tmpMaxValue;
        this.maxValueChanged.emit(this.maxValue);
      }

      this.sliderOne.nativeElement.value = isNumber(this._tmpMinValue) ? this._tmpMinValue : this.min;
      this.sliderTwo.nativeElement.value = isNumber(this._tmpMaxValue) ? this._tmpMaxValue : this.max;
    });

    this.draggerWidth = this.handleOne.nativeElement.offsetWidth;
    this.setDragPosFromVal();
  };

}
