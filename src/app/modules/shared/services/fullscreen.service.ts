import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Utils} from '../src/utils.class';

export enum FullScreenEventType {
  RequestEnter,
  Enter,
  RequestLeave,
  Leave
}

@Injectable()
export class FullScreenService {
  private _observable: EventEmitter<FullScreenEventType>;
  private _isInFullScreen = false;
  private _fullScreenCall: Function;

  constructor() {
    const htmlEl = document.querySelector('html');

    Utils.vendorPrefixes.every((vendorPrefix) => {
      const requestFullscreenFnName = Utils.toCamelCase(vendorPrefix, 'requestFullscreen');
      const fullscreenListenerName = `${vendorPrefix}fullscreenchange`;
      if (htmlEl[requestFullscreenFnName]) {
        this._fullScreenCall = () => {
          htmlEl[requestFullscreenFnName]();
        };
        document.addEventListener(fullscreenListenerName, this.fullScreenListener.bind(this));
        return false;
      } else {
        return true;
      }
    });

    this._observable = new EventEmitter<FullScreenEventType>();
  }

  private fullScreenListener() {
    Utils.vendorPrefixes.every((vendorPrefix) => {
      const fullScreenElName = Utils.toCamelCase(vendorPrefix, 'fullscreenElement');
      if (document[fullScreenElName]) {
        this._isInFullScreen = true;
        this._observable.emit(FullScreenEventType.Enter);
        return false;
      } else {
        this._isInFullScreen = false;
        this._observable.emit(FullScreenEventType.Leave);
        return true;
      }
    });
  }

  public isInFullScreen() {
    return this._isInFullScreen;
  }

  public getObservable(): Observable<FullScreenEventType> {
    return this._observable;
  }

  public enter() {
    if (!this._isInFullScreen && this._fullScreenCall) {
      this._fullScreenCall();
      this._observable.emit(FullScreenEventType.RequestEnter);
    }
  }

  public leave() {
    if (this._isInFullScreen) {

      Utils.vendorPrefixes.every((vendorPrefix) => {
        const exitFullscreenFnName = Utils.toCamelCase(vendorPrefix, 'exitFullscreen');
        if (document[exitFullscreenFnName]) {
          document[exitFullscreenFnName]();
          return false;
        } else {
          return true;
        }
      });

      this._observable.emit(FullScreenEventType.RequestLeave);
    }
  }

  public canEnterFullScreen() {
    return !!this._fullScreenCall;
  }
}
