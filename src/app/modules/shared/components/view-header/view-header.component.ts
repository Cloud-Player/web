import {Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ScrollViewComponent} from '../scroll-view/scroll-view.component';
import {Subscription} from 'rxjs/Subscription';
import {debounce} from 'underscore';


@Component({
  selector: 'app-view-header',
  styleUrls: ['./view-header.style.scss'],
  templateUrl: './view-header.template.html'
})

export class ViewHeaderComponent implements OnInit, OnDestroy {
  private _subscription: Subscription;
  private _debouncedSetWidth: Function;

  @ViewChild('header')
  public header;

  constructor(private el: ElementRef,
              private zone: NgZone,
              private scrollViewComponent: ScrollViewComponent) {
    this._subscription = new Subscription();
  }

  private setWidth() {
    this.header.nativeElement.style.width = `calc(100vw - ${this.el.nativeElement.getBoundingClientRect().x}px)`;
  }

  private scrollChange(top: number) {
    if (top > 10) {
      this._debouncedSetWidth();
      this.header.nativeElement.classList.add('affixed');
    } else {
      this.header.nativeElement.classList.remove('affixed');
      this.header.nativeElement.style.width = 'inherit';
      this._debouncedSetWidth = debounce(this.setWidth.bind(this), 100, true);
    }
  }

  ngOnInit() {
    this.zone.runOutsideAngular(() => {
      this._subscription.add(
        this.scrollViewComponent.scrollPosChange.subscribe(this.scrollChange.bind(this))
      );
    });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

}
