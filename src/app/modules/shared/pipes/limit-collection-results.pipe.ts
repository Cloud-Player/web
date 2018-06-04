import {EventEmitter, NgZone, OnDestroy, Pipe, PipeTransform} from '@angular/core';
import {debounce} from 'underscore';
import {Subscription} from 'rxjs';

@Pipe({name: 'limitCollectionresults', pure: false})
export class LimitCollectionresultsPipe implements PipeTransform, OnDestroy {
  private _orgLimit: number;
  private _limit: number;
  private _throttledScrollHandler: any;
  private _valueChange: EventEmitter<number>;
  private _subscriptions: Subscription;

  constructor(private zone: NgZone) {
    this._throttledScrollHandler = debounce(this._increaseLimitOnBottomReached.bind(this), 200);
    this._valueChange = new EventEmitter();
    this._subscriptions = new Subscription();

    this.zone.runOutsideAngular(() => {
      document.addEventListener('scroll', this._throttledScrollHandler, true);
    });
  }

  private _increaseLimitOnBottomReached(ev: MouseWheelEvent) {
    const srcEl: any = ev.srcElement || ev.target;
    if (srcEl.scrollTop / (srcEl.scrollHeight - srcEl.offsetHeight) > 0.8) {
      if (this._limit) {
        this._limit += this._orgLimit;
      } else {
        this._limit = this._orgLimit * 2;
      }
      this.zone.run(() => {
        this._valueChange.emit(this._limit);
      });
    }
  }

  transform(items: Array<any>, args: { limit: number } = {limit: null}): any {
    if (this._limit && this._limit > items.length) {
      document.removeEventListener('scroll', this._throttledScrollHandler, true);
      return items;
    }

    if (items && args.limit && items.length > args.limit) {
      this._orgLimit = args.limit;
      return items.slice(0, this._limit || this._orgLimit);
    } else {
      return items;
    }
  }

  ngOnDestroy(): void {
    document.removeEventListener('scroll', this._throttledScrollHandler, true);
  }
}
