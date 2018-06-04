import {AfterViewInit, Component, ElementRef, NgZone, OnDestroy, ViewChild} from '@angular/core';
import {ScrollViewComponent} from '../scroll-view/scroll-view.component';
import {Subscription} from 'rxjs';
import {debounce} from 'underscore';
import {LayoutService} from '../../services/layout';


@Component({
  selector: 'app-view-header',
  styleUrls: ['./view-header.style.scss'],
  templateUrl: './view-header.template.html'
})

export class ViewHeaderComponent implements AfterViewInit, OnDestroy {
  private _subscription: Subscription;
  private _debouncedSetWidth: Function;
  private _boundingRect: ClientRect;
  private _affixTop: number;

  @ViewChild('header')
  public header;

  constructor(private el: ElementRef,
              private zone: NgZone,
              private layoutService: LayoutService,
              private scrollViewComponent: ScrollViewComponent) {
    this._subscription = new Subscription();
    this._debouncedSetWidth = debounce(this.setWidth.bind(this), 100, true);
  }

  private setWidth() {
    this.header.nativeElement.style.width = `calc(100vw - ${this._boundingRect.left}px)`;
  }

  private setBoundRect() {
    this._boundingRect = this.el.nativeElement.getBoundingClientRect();
    this._affixTop = this._boundingRect.top + this.scrollViewComponent.scrollPos;
    this.scrollChange(this.scrollViewComponent.scrollPos);
  }

  private scrollChange(top: number) {
    if (top > this._affixTop) {
      this._debouncedSetWidth();
      this.header.nativeElement.classList.add('affixed');
    } else {
      this.header.nativeElement.classList.remove('affixed');
      this.header.nativeElement.style.width = 'inherit';
      this._debouncedSetWidth = debounce(this.setWidth.bind(this), 100, true);
    }
  }

  ngAfterViewInit() {
    this.setBoundRect();
    this.zone.runOutsideAngular(() => {
      this._subscription.add(
        this.scrollViewComponent.scrollPosChange.subscribe(this.scrollChange.bind(this))
      );
      this._subscription.add(
        this.layoutService.getObservable().subscribe(this.setBoundRect.bind(this))
      );
    });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

}
