import {Component, ElementRef, EventEmitter, NgZone, OnDestroy, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-scroll-view',
  styleUrls: ['./scroll-view.style.scss'],
  templateUrl: './scroll-view.template.html'
})

export class ScrollViewComponent implements OnInit, OnDestroy {
  private _subscription: Subscription;

  public scrollPos: number;

  @ViewChild('scrollView')
  public scrollView: ElementRef;

  @Output()
  public scrollPosChange: EventEmitter<number>;

  constructor(private el: ElementRef, private zone: NgZone, private renderer2: Renderer2) {
    this._subscription = new Subscription();
    this.scrollPosChange = new EventEmitter();
    this.scrollPos = 0;
  }

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      this._subscription.add(
        this.renderer2.listen(this.scrollView.nativeElement, 'scroll', () => {
          this.scrollPos = this.scrollView.nativeElement.scrollTop;
          this.scrollPosChange.emit(this.scrollPos);
        })
      );
    });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
