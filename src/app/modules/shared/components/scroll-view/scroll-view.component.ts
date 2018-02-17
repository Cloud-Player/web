import {Component, ElementRef, EventEmitter, NgZone, OnDestroy, OnInit, Output, Renderer2} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';


@Component({
  selector: 'app-scroll-view',
  styleUrls: ['./scroll-view.style.scss'],
  templateUrl: './scroll-view.template.html'
})

export class ScrollViewComponent implements OnInit, OnDestroy {
  private _subscription: Subscription;

  @Output()
  public scrollPosChange: EventEmitter<number>;

  constructor(private el: ElementRef, private zone: NgZone, private renderer2: Renderer2) {
    this._subscription = new Subscription();
    this.scrollPosChange = new EventEmitter();
  }

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      this._subscription.add(
        this.renderer2.listen(this.el.nativeElement, 'scroll', () => {
          this.scrollPosChange.emit(this.el.nativeElement.scrollTop);
        })
      );
    });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
