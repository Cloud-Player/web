import {Component, Input, Output, ViewChild, ElementRef, EventEmitter} from '@angular/core';
import '!!style!css!sass!./range-slider.style.scss';

@Component({
  selector: 'range-slider',
  styles: [ require('./range-slider.style.scss') ],

  template: require('./range-slider.template.html')
})

export class RangeSliderComponent {
  private tmpVal: number = 0;
  private val: number = 0;
  private minVal: number = 0;
  private maxVal: number = 0;
  private stepVal: number = 0.1;
  private showLoadingSpinner: boolean = false;
  private dragInProgress: boolean = false;
  private draggerWidth = 0;
  @Output() valueChange = new EventEmitter();
  @Output() valueChanged = new EventEmitter();

  @ViewChild('progressBarLine') progressBarLine: ElementRef;
  @ViewChild('progressBarBg') progressBarBg: ElementRef;
  @ViewChild('handle') handle: ElementRef;

  get tmpValue(): number {
    return this.tmpVal;
  }

  set tmpValue(val: number) {
    this.tmpVal = val;
    this.setDragPosFromVal();
    this.valueChange.emit(val);
  }

  @Input()
  get value(): number {
    return this.val;
  }

  set value(val: number) {
    if (!this.dragInProgress) {
      this.val = val;
      this.tmpValue = val;
    }
  }

  @Input()
  get max(): number {
    return this.maxVal;
  }

  set max(val: number) {
    if (val) {
      this.maxVal = val;
      this.setDragPosFromVal();
    }
  }

  @Input()
  get min(): number {
    return this.minVal;
  }

  set min(val: number) {
    if (val) {
      this.minVal = val;
      this.setDragPosFromVal();
    }
  }

  @Input()
  get step(): number {
    return this.stepVal;
  }

  set step(val: number) {
    if (val) {
      this.stepVal = val;
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

  private setDragPosFromVal() {
    let pos = (((this.tmpVal - this.min) / (this.max - this.min)) * 100);
    this.handle.nativeElement.style.left = pos + '%';
    this.handle.nativeElement.style.transform = 'translateX(-' + ((this.draggerWidth / 100) * pos) + 'px)';
    this.progressBarLine.nativeElement.style.width = pos + '%';
  }


  ngAfterContentInit() {
    this.el.nativeElement.addEventListener('mousedown', () => {
      this.dragInProgress = true;
    });

    this.el.nativeElement.addEventListener('mouseup', () => {
      this.dragInProgress = false;
      this.value = this.tmpValue;
      this.valueChanged.emit(this.value);
    });

    this.draggerWidth = this.handle.nativeElement.offsetWidth;
    this.setDragPosFromVal();
  };

}
