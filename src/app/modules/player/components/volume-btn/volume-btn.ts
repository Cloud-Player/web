import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-volume-btn',
  styleUrls: ['./volume-btn.scss'],
  templateUrl: './volume-btn.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VolumeBtnComponent {

  @Input()
  volume: number;

  @Output()
  volumeChange: EventEmitter<number>;

  constructor(private el: ElementRef, private cdr: ChangeDetectorRef) {
    this.volumeChange = new EventEmitter<number>();
  }

  public toggleVolume() {
    if (this.volume > 0) {
      this.volume = 0;
    } else {
      this.volume = 100;
    }
    this.volumeChange.emit(this.volume);
  }

  public onSliderChange(tmpVol: number) {
    this.volumeChange.emit(tmpVol);
    this.el.nativeElement.classList.add('is-changing');
    this.cdr.detectChanges();
  }

  public onSliderChanged() {
    setTimeout(() => {
      this.el.nativeElement.classList.remove('is-changing');
    });
  }
}
