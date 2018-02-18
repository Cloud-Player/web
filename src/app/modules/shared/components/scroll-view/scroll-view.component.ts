import {Component, ElementRef, EventEmitter, NgZone, OnDestroy, OnInit, Output, Renderer2} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';


@Component({
  selector: 'app-scroll-view',
  styleUrls: ['./scroll-view.style.scss'],
  templateUrl: './scroll-view.template.html'
})

export class ScrollViewComponent implements OnInit, OnDestroy {
  private _subscription: Subscription;

  public scrollPos: number;

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
        this.renderer2.listen(this.el.nativeElement, 'scroll', () => {
          this.scrollPos = this.el.nativeElement.scrollTop;
          this.scrollPosChange.emit(this.scrollPos);
        })
      );
    });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
