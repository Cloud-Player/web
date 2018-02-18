import {EventEmitter, Injectable, NgZone} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {throttle} from 'underscore';

export interface ILayout {
  windowSize: {
    width: number;
    height: number;
  };
}

@Injectable()
export class LayoutService {
  private _observable: EventEmitter<ILayout>;
  private _layoutProperties: ILayout;

  constructor(private zone: NgZone) {
    this._observable = new EventEmitter<ILayout>();
    this._layoutProperties = {
      windowSize: {
        width: 0,
        height: 0
      }
    };
    const throttledLayoutChangeEmitter = throttle(this.emitLayoutChange.bind(this), 10);
    this.zone.runOutsideAngular(() => {
      window.addEventListener('resize', throttledLayoutChangeEmitter);
    });
  }

  private setWindowSize() {
    this._layoutProperties.windowSize.width = window.innerWidth;
    this._layoutProperties.windowSize.height = window.innerHeight;
  }

  public getObservable(): Observable<ILayout> {
    return this._observable;
  }

  public emitLayoutChange(): void {
    this.setWindowSize();
    this._observable.emit(this._layoutProperties);
  }
}
