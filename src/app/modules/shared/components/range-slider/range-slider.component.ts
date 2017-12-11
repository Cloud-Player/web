import {
  Component, Input, Output, ViewChild, ElementRef, EventEmitter, AfterContentInit,
  OnDestroy
} from '@angular/core';

@Component({
  selector: 'app-range-slider',
  styleUrls: ['./range-slider.style.scss'],
  templateUrl: './range-slider.template.html'
})
export class RangeSliderComponent implements OnDestroy, AfterContentInit {
  private tmpVal = 0;
  private val = 0;
  private minVal = 0;
  private maxVal = 0;
  private stepVal = 0.1;

  showLoadingSpinner = false;
  dragInProgress = false;
  dragDisplayValue = 0;
  draggerWidth = 0;

  @Output() valueChange = new EventEmitter();
  @Output() valueChanged = new EventEmitter();

  @ViewChild('progressLine') progressBarLine: ElementRef;
  @ViewChild('progressBar') progressBarBg: ElementRef;
  @ViewChild('handle') handle: ElementRef;

  get tmpValue(): number {
    return this.tmpVal;
  }

  set tmpValue(val: number) {
    this.tmpVal = val;
    this.setDragPosFromVal();
    this.dragDisplayValue = this.getDisplayValue(val);
    this.valueChange.emit(val);
  }

  @Input()
  public transformDisplayValue: Function;
  @Input()
  public hideSliderValue: boolean;
  @Input()
  public showCurrentValue: boolean;

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

  public getDisplayValue(value: number) {
    if (value && typeof this.transformDisplayValue === 'function') {
      return this.transformDisplayValue(value);
    } else {
      return value;
    }
  }

  private setDragPosFromVal() {
    const pos = (((this.tmpVal - this.min) / (this.max - this.min)) * 100);
    this.handle.nativeElement.style.left = pos + '%';
    this.handle.nativeElement.style.transform = 'translateX(-' + ((this.draggerWidth / 100) * pos) + 'px)';
    this.progressBarLine.nativeElement.style.width = pos + '%';
  }

  private dragStart(): void {
    this.draggerWidth = this.handle.nativeElement.offsetWidth;
    this.dragInProgress = true;
  }

  private dragEnd(): void {
    this.dragInProgress = false;
    this.value = this.tmpValue;
    this.valueChanged.emit(this.value);
  }


  ngAfterContentInit(): void {
    this.el.nativeElement.addEventListener('mousedown', this.dragStart.bind(this));
    this.el.nativeElement.addEventListener('touchstart', this.dragStart.bind(this));

    this.el.nativeElement.addEventListener('mouseup', this.dragEnd.bind(this));
    this.el.nativeElement.addEventListener('touchend', this.dragEnd.bind(this));

    this.setDragPosFromVal();
  }

  ngOnDestroy(): void {
    this.el.nativeElement.removeEventListener('mousedown', this.dragStart.bind(this));
    this.el.nativeElement.removeEventListener('touchstart', this.dragStart.bind(this));

    this.el.nativeElement.removeEventListener('mouseup', this.dragEnd.bind(this));
    this.el.nativeElement.removeEventListener('touchend', this.dragEnd.bind(this));
  }

}
